---
title: "Icarus Malware Analysis"
image: "images/blog/mal/icarus/icarus.png"
date: "2026-04-18"
excerpt: "Icarus is a 32-bit .NET RAT (Remote Access Trojan) with HVNC (Hidden Virtual Network Computing) capabilities. It's designed to stealthily control infected machines, steal cryptocurrency wallets, and maintain persistence while evading detection."
category: "Malware Analysis"
fetured: false
---


**Basic file info:**

**Hashes:**
- MD5: `88e88b718776aca47ca88b140ae30b1a`
- SHA256: `8e88de63c132f964891dd00501bee5078f27dfcec7ca122f19bd43f9ed933427`
![sample info](images/blog/mal/icarus/info.png)

## Looking at the strings

The Icarus malware developer seems to have cared little about obfuscation or encryption. Even before we decompile this in .NET dnSpy, we can vaguely make sense of parts of what the malware does. For instance, the screenshot of the strings below shows it stops browser apps. So we can confidently say this malware terminates all the browsers specified in the code using taskkill.

![icarus strings](images/blog/mal/icarus/strings.png)

## Decompiling the sample

Since this is a .NET sample, I'll use dnSpy to view it. Based on the strings we observed above, I can confidently say this will give us the actual code since the developer didn't put any attempt at hiding anything. This is an easy sample — all we have to do is read the decompiled code as is. This is quite unfortunate: who would write malware and release it without an attempt to hide its obviousness?

## Finding the entry point in dnSpy

![malware structure in dnSpy](images/blog/mal/icarus/structure.png)

Analysis of the DLL section as shown in the image above: the DLL has a class called HVNC which contains our main entry point as well as other functions of the malware. Looking at the main function, the malware first tries to add itself to Microsoft Defender exclusion list.

![adding itself to defender exclusion path](images/blog/mal/icarus/main.png)

After adding itself to Defender exclusion paths, the malware gathers system information (OS version, screen resolution, username and machine name). It then connects to a C2 server using command-line arguments: `[identifier, ip, port, mutex_name]`. It sends the collected data to the attacker's IP and port, and finally enters an infinite loop — sleeping for 10 seconds forever to keep running.

![sending data to C2](images/blog/mal/icarus/main2.png)

## Interesting functionality in the HVNC class

The DLL HVNC class has other important functionalities we can examine, such as `SendData`, `StartRootkit`, `uninstall`, `KillAllBrowsers`, and `GetChromeWallets`.

### SendData

As observed earlier, this function is called in the main function. It takes an IP address and port number. This method connects the malware to a remote C2 server, retrying indefinitely until the connection succeeds. Once connected, it sets up an asynchronous read stream to receive incoming commands. It then collects system information from the victim's machine, including the Windows version from the registry, the user's region, and a date stamp stored in or created at `%APPDATA%\temp0923`. It also fetches the victim's public IP address by querying `ipinfo.io/ip`. All of this data, along with a hardcoded identifier (`54321|`), the username, and a version string, is formatted and sent back to the attacker.

![send data](images/blog/mal/icarus/senddata.png)

### KillAllBrowsers

This method forcefully terminates 18 different web browsers (Chrome, Firefox, Edge, Opera, Brave, and others) by killing their processes. This is likely done to unlock browser data files or steal saved credentials without file locks getting in the way.

![kill all 18 browsers if running on the system](images/blog/mal/icarus/killAllBrowsers.png)

### GetChromeWallets

This method steals cryptocurrency wallet data from 23 different Chrome extensions, including MetaMask, Phantom, Binance, Coin98, Keplr, Tron, and others. It copies each wallet's Local Extension Settings folder from Chrome's user data directory into a specified save directory, then deletes that directory if no wallets were found.

![steal cryptocurrency wallet data](images/blog/mal/icarus/GetChromeWallets.png)

### StartRootkit

This method downloads and executes a rootkit from a remote server (IP `193.31.116.239`, path decoded from base64: `aHR0cDovLzE5My4zMS4xMTYuMjM5L2NyeXB0L3B1YmxpYy9VcGRhdGVfRG93bmxvYWRzL3J0LmpwZw==`). It fetches the file (masqueraded as `rt.jpg`), saves it as `rk.exe` in the temp folder, runs it, then deletes the executable.

![get rootkit from remote C2 server](images/blog/mal/icarus/StartRootkit.png)

### uninstall

This method self-destructs the malware. It kills the current process, deletes its own executable file, and removes its persistence mechanisms — deleting the Run registry key (for non-admin users) or a scheduled task (for admin users). Finally, it creates and runs a batch script to clean up leftover files before exiting.

![self-destruct icarus activity on the system](images/blog/mal/icarus/uninstall.png)

### StopRootkit

This method downloads and executes a removal tool for the previously installed rootkit. It fetches a file from the same remote server (decoded base64 URL pointing to `remove.jpg`), saves it as `rkd.exe` in the temp folder, runs it, then deletes the executable.

![removal executable for the previously set up rootkit](images/blog/mal/icarus/StopRootkit.png)

## Other Icarus malware sections

These other functions don't seem to have interesting functionality we can look into. For now, we'll ignore them and be content with the above analysis, as we have gotten the bigger picture of what the malware actually does.

![uninteresting functionalities](images/blog/mal/icarus/pass.png)

## Conclusion

Icarus is a full-featured HVNC remote access trojan focused on stealth and cryptocurrency theft. It disables Windows Defender, kills browsers to unlock data, and steals wallet files from 23 different Chrome extensions including MetaMask and Phantom. It downloads and executes a rootkit for deep system persistence, while also providing a clean-up routine to remove that rootkit on demand. A self-destruct mechanism erases the malware and its persistence entries when needed. Overall, this is sophisticated crimeware designed to silently hijack machines, steal crypto wallets, and evade detection. Despite its advanced capabilities, the complete lack of code obfuscation makes analysis trivial.
