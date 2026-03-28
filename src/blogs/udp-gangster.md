---
title: "UdpGangster Reflective Loader Backdoor"
image: "images/blog/udp.png"
date: "2025-02-12"
excerpt: "A Reflective Loader mechanism to load shellcode"
category: "Malware Analysis"
featured: true
---


**UDPGangster Backdoor Masquerading as PDF**

**Threat Background**

UDPGangster is a backdoor linked to the MuddyWater hacking group. First identified in December 2025, it provides persistent remote access to compromised systems. It uses UDP for communication with the attacker's command-and-control server. Successful execution gives the attacker full remote code execution on the victim's machine. The malware was primarily delivered through phishing emails impersonating government agencies. The malware makes use of Embedded Reflective loading mechanism that receives a raw PE image and manually reconstructs it inside a newly located memory region.   


**Technical Details**
** Detect It Easy**
![detect it easy UDPGangster backdoor](/images/blog/udp-die.png)

**File Information**
- **File name:** ./2025-08-19_bed77abc7e12230439c0b53dd68ffaf.pdf
- **Size:** 2.31 MB (2,417,152 bytes)
- **File type:** PE64 executable
- **Extension:** .exe (masquerading as .pdf)
- **OS target:** Windows Vista and later
- **Architecture:** AMD64 (64-bit)
- **Subsystem:** GUI
- **Entropy:** 5.02778 (not packed)

**Hashes**
- MD4: 6250a396d8117827ed167423b242618d
- MD5: bed77abc7e12230439c0b53dd68ffaf7
- SHA1: 34a0f4447df3631bc78d53fc97a99503189f8cad
- SHA224: 6d6c1be27e86a0613a7bf4af03f124daf324f47ced3f10c31ba3d150
- SHA256: 930f0dc9929c6097f718b42d1dbad42d0263ffac5d598a81fc6fa1ea1f58c41c

**Execution Flow of UDPGangster**
```
WinMain
 ├── Drop browser decoy
 ├── Base64 decode stub
 ├── ROR(6) deobfuscation
 ├── Reflective PE loader
 │     ├── Map sections
 │     ├── Fix imports
 │     ├── Apply relocations
 │     ├── Set protections
 │     └── Jump to OEP
 └── Backdoor runs in memory
```

**Static Analysis with IDA Pro**

**String Analysis**

Most strings are not readable. IDA shows gibberish, indicating string encryption. Later analysis revealed these strings are part of embedded shellcode.
![string obfuscation](/images/blog/udp-strings.png)

**Finding Main**

IDA's autoanalysis identified WinMain as the entry point. This is where analysis begins.

**Main Execution - WinMain Analysis**

WinMain orchestrates the full execution chain. It has three stages: file staging, anti-analysis obfuscation, and in-memory payload execution.

**1. Environment Resolution**
![environment resolution](/images/blog/udp-env.png)

The malware retrieves `USERPROFILE` and builds a path inside the user's home directory.

If the target file does not already exist:
- Gets its own executable path using `GetModuleFileNameA`
- Splits directory and filename with a custom SIMD-optimized `strrchr`
- Removes the file extension
- Builds a new output path
- Writes embedded binary data to disk using `CreateFileA` and `WriteFile`

It then launches Microsoft Edge:
```
cmd.exe /c start "C:\Program Files(x86)\Microsoft\Edge\Application\msedge.exe" "<dropped_file>"
```
![launching edge](/image/blog/

**2. Anti-Analysis Activity**

The malware performs several non-functional operations:
- Allocating and freeing memory with `VirtualAlloc`
- Executing floating-point arithmetic involving π
- Running XOR accumulation loops

These instructions do not contribute to actual logic. They inflate entropy, confuse sandboxes, and obfuscate static signatures.

**3. Encoded Payload Loader (Core Backdoor)**

The malware builds a short base64 string (`"U5YkA"`) and decodes it using `CryptStringToBinaryA`.

The decoded bytes are then transformed:
```
byte = ROR(byte, 6)
```

This produces executable shellcode.

The transformed buffer is passed to `sub_140001B04`, which returns a function pointer. The pointer is immediately executed. This loads the backdoor payload entirely in memory. No secondary process is created. No additional files are dropped.

**3.1 **sub_14000BBF0: In-Memory PE Loader**
![loader](/images/blog/udp-ref.png)

This function receives a raw PE file and manually reconstructs it in a newly allocated memory region.

**Steps:**

- Parses DOS and NT headers to get:
  - `SizeOfImage`
  - `NumberOfSections`
  - `AddressOfEntryPoint`

- Allocates memory with `VirtualAlloc` for the full image

- Copies each section from the source buffer to the new region

- Resolves imports:
  - Calls `GetModuleHandleA`
  - Falls back to `LoadLibraryA`
  - Resolves functions with `GetProcAddress`
  - Writes addresses to the Import Address Table

- Applies base relocations if the image loads at a different address than preferred

- Adjusts section memory protections with `VirtualProtect`

- Returns a pointer to the mapped image's entry point

The caller executes this pointer. The backdoor payload runs entirely in memory.

This is reflective loading. It evades disk-based detection and standard module monitoring.

## Static Extraction of Embedded Backdoor

The embedded backdoor payload can be reconstructed by replicating the malware’s decoding routine. The malware:

1. Base64-decodes an embedded string using `CryptStringToBinaryA`.
2. Applies a 6-bit right rotation (ROR 6) to each decoded byte.
3. Passes the resulting buffer to a reflective PE loader.

By replicating these steps offline we can decrypt the Portable Executable was successfully. The resulting binary begins with the standard `MZ` header and contains a valid PE structure.

This confirms that UDPGangster embeds a secondary stage backdoor as an encoded PE file which is executed entirely in memory via reflective loading.







