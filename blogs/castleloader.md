---
title: "Cracking Encrypted Inno Setup Malware (CastleLoader)"
image: "images/blog/mal/casltleloader/castleloader_die.png"
date: "2026-04-23"
excerpt: "How to extract files from an encrypted Inno Setup sample without running it – using hashcat and a strings dump."
category: "Malware Analysis"
---

![castle loaer in detect it easy](images/blog/mal/casltleloader/castleloader_die.png)

In this post I’ll show how to extract files from an encrypted Inno Setup sample without running it. The malware is CastleLoader, a loader that uses Inno Setup to drop legitimate-looking DLLs and EXEs for DLL side-loading.

## The Problem

Inno Setup can encrypt its internal data using XChaCha20. If you try to extract the files with `innoextract.exe` on a protected installer, you get this:

```
.\innoextract.exe .\joachim.exe
Warning: Setup contains encrypted files, use the --password option to extract them
```

All files are listed as encrypted. You need the password.

## Get the Password Hash

First, use `innoextract` with the `--show-password` flag on the installer binary (or a dumped `.bin` file):

```
.\innoextract.exe --show-password .\joachim.bin
```

Output:

```
Password hash: SHA-1 52eacbe922371c8deb1b1e0ac2cb79a0b31d12c8
Password salt: 50617373776f7264436865636b48617368d43d09a8a3c4a053 (hex bytes)
Password encoding: UTF-16LE
```

This tells us:
- Hash algorithm: `sha1($salt.utf16le($pass))`
- Hashcat mode: `-m 140`
- Format: `hash:salt` with `--hex-salt`

Combine hash and salt:

```
52eacbe922371c8deb1b1e0ac2cb79a0b31d12c8:50617373776f7264436865636b48617368d43d09a8a3c4a053
```

## Crack the Password with Hashcat

Run hashcat using a dictionary. In this case, I dumped strings from the executable using `strings.exe` and used that as the wordlist.

```
hashcat -m 140 -a 0 --hex-salt 52eacbe922371c8deb1b1e0ac2cb79a0b31d12c8:50617373776f7264436865636b48617368d43d09a8a3c4a053 strings.txt
```

Hashcat cracks it almost instantly:

```
52eacbe922371c8deb1b1e0ac2cb79a0b31d12c8:50617373776f7264436865636b48617368d43d09a8a3c4a053:5No3#EU8FEeLUMRK8bmGW8$7$BAga$XW7*K%K&*kZ8B@%P!9KapxZJepz@8xt@fmufuKH7Qd36condg6jywsAnmZbYged^VPTkoMHuEqe3r7wGnKmKq4RJ4uu#j@xN*T
```

The password is the long string after the colon.

## Extract the Files

Save the password to a file (e.g., `pass.txt`) and run:

```
.\innoextract.exe --password-file .\pass.txt .\joachim.bin
```

Now all files extract successfully:

- `ARE.dll`
- `libdirect3d11_plugin.dll`
- `AutoIt3.exe`
- `freely.a3x`, `freely.xlsm`
- and others under `bin\`

## Next Steps

With the extracted files, you can analyze each one to find the actual malware payload. Look for suspicious behavior, AutoIt scripts, or side-loading candidates.
