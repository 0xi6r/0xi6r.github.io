---
title: "AV & EDR evasion"
image: "images/blog/av.png"
date: "2025-10-14"
excerpt: "most effective payload loaders fly under the radar by combining direct syscalls, API hashing, entropy reduction, and anti-analysis tricks like mouse-click monitoring and self-deletion. They avoid the C runtime, hide imports, and even brute-force decryption keys at runtime—all to look less like malware and more like just another ordinary program."
category: "Red Team"
---

**Payload Loaders Security Evasion**

In the world of offensive security—especially during authorized red team engagements—getting code to run on a target system isn’t just about writing a payload. It’s about making that payload invisible to the layers of defense standing in its way. Antivirus (AV), Endpoint Detection and Response (EDR), and behavioral analytics don’t just look for known malware; they hunt for anything that *acts* suspicious. To bypass them, modern payload loaders have evolved into highly engineered tools that blend stealth, obfuscation, and low-level system knowledge.

The core agenda isn’t to “break” security—it’s to operate within the rules of the system while remaining unseen. And that requires a layered approach.

### 1. **Direct Syscalls: Skipping the Watchful Eye**

Most Windows programs interact with the operating system through the Windows API—functions like `CreateFile`, `OpenProcess`, or `CreateThread`. But these API calls leave clear footprints in logs and memory, and EDRs hook into them to monitor behavior.

To sidestep this, advanced loaders use **direct syscalls**—bypassing the high-level API entirely and calling the kernel directly. This is often implemented using techniques like **Hell’s Gate**, which dynamically resolves the correct system call numbers at runtime by parsing the export tables of `ntdll.dll`. By doing so, the loader avoids the user-mode API layer where most monitoring occurs, making its actions far less visible.

### 2. **API Hashing: Hiding Imports**

Even if a program doesn’t call suspicious functions outright, its **Import Address Table (IAT)**—the list of external functions it plans to use—can raise red flags. A binary that imports `VirtualAlloc`, `CreateRemoteThread`, and `WriteProcessMemory` is practically waving a red flag.

To counter this, modern loaders **resolve APIs at runtime using hashes**. Instead of naming `CreateFileW` directly, the code stores a hash of the function name (e.g., using Jenkins or DJB2 algorithms) and scans the export table of a DLL like `kernel32.dll` to find the matching function. This means the IAT stays clean—often containing only benign-looking imports—or can even be fully stripped.

This technique also extends to DLL resolution: instead of calling `LoadLibrary("ntdll.dll")`, the loader walks the Process Environment Block (PEB) to find already-loaded modules and hashes their names to identify the right one.

### 3. **Payload Encryption and Brute-Force Decryption**

Raw shellcode is easily flagged by static analysis. So it’s encrypted—commonly with RC4 or similar algorithms—and embedded in the binary. But even encrypted payloads can stand out if the key is hardcoded.

A clever twist? **Encrypt the key itself**, then brute-force it at runtime using a known “hint” byte. The loader tries incremental values until the decrypted key produces a known byte pattern. This adds a layer of obscurity: the real decryption key never appears in the binary, and the brute-force loop looks like normal computation to most scanners.

Decryption is often done using Windows-native functions like `SystemFunction032` from `advapi32.dll`—a legitimate cryptographic function that’s less likely to trigger alerts than custom crypto routines.

### 4. **Anti-Analysis Defenses**

Automated sandboxes and analysis environments behave differently than real user systems. They often lack mouse movement, have short execution windows, or run in known virtualized environments.

Loaders counter this with **environment-aware logic**:
- **Mouse click monitoring**: Using low-level hooks (`WH_MOUSE_LL`), the loader waits for a certain number of real user interactions before proceeding. No clicks? Likely a sandbox.
- **Timed delays**: Using native syscalls like `NtDelayExecution`, the loader pauses for increasingly long periods. Many sandboxes kill samples after 30–60 seconds—so delaying beyond that window can cause the analysis to time out.
- **Self-deletion**: Immediately after launch, the loader renames and marks its own file for deletion using alternate data streams (e.g., `:Maldev`). This removes forensic traces from disk before defenders can react.

These checks aren’t foolproof, but they’re effective at filtering out automated analysis systems that can’t mimic human behavior.

### 5. **Stripping the C Runtime (CRT)**

By default, C/C++ programs link against the C Runtime Library—a collection of helper functions for things like string manipulation, memory copying, and I/O. But CRT brings bloat, predictable code patterns, and additional imports that increase entropy and detection surface.

A hardened loader **removes CRT entirely**, implementing only the minimal functions it needs—like custom `memcpy`, `memset`, or character-case conversion—directly in code. This reduces file size, lowers entropy, and eliminates unnecessary imports that could tip off defenders.

Even debugging output (like `printf`) is replaced with direct console writes via `WriteConsoleA/W`, and only enabled in debug builds—never in final payloads.

### 6. **IAT Camouflage**

Even after removing obvious imports, the IAT might still look suspicious. The solution? **IAT camouflage**—populating the import table with benign, commonly used functions (like `GetSystemTime` or `MessageBox`) to make the binary appear like a harmless utility. This tricks static analysis tools that score binaries based on import reputation.

### 7. **Clean Execution Flow**

Finally, the injection method matters. Instead of classic `VirtualAllocEx` + `WriteProcessMemory` + `CreateRemoteThread`—a well-known malware pattern—modern loaders use **section mapping via `NtCreateSection` and `NtMapViewOfSection`**. This maps the payload into memory as a shared section, which is a legitimate technique used by Windows itself (e.g., for DLL loading). It’s quieter, harder to distinguish from normal behavior, and works both locally and remotely.

---

### The Bigger Picture

None of these techniques work in isolation. What makes them powerful is how they **layer together**: encrypted payloads, resolved APIs, direct syscalls, anti-analysis logic, and a clean IAT all combine to create a binary that looks ordinary—but isn’t.

For defenders, this underscores a critical truth: **detection can’t rely on single signals**. High entropy, unusual imports, or suspicious API calls are useful clues—but attackers are actively engineering around each one. The arms race isn’t just about new malware; it’s about malware that *refuses to look like malware at all*.

For authorized assessors, mastering this craft isn’t about deception—it’s about realism. Real adversaries use these methods. Understanding them is the only way to test defenses meaningfully and help organizations close the gaps that matter.
