---
title: "Cracking Encrypted Inno Setup Malware (CastleLoader)"
image: "images/blog/mal/casltleloader/castleloader_die.png"
date: "2026-04-23"
excerpt: "How to extract files from an encrypted Inno Setup sample without running it – using hashcat and a strings dump."
category: "Malware Analysis"
---

![castle loaer in detect it easy](images/blog/mal/casltleloader/castleloader_die.png)

In this post I’ll show how to extract files from an encrypted Inno Setup sample without running it. The malware is CastleLoader, a loader that uses Inno Setup to drop legitimate-looking DLLs and EXEs for side-loading.

## The Problem

Inno Setup can encrypt its internal data using XChaCha20. If you try to extract the files with [innoextract.exe](https://github.com/dscharrer/innoextract) unpacker on the protected installer, you get this:

![inno unable to decrypt without password](images/blog/mal/casltleloader/innoextract.png)

All files are listed as encrypted. You need the password which is only known to the malware author, but [innoextract.exe](https://github.com/dscharrer/innoextract) as an option we can utilize to assist us crack the password.

## Getting the Password Hash

The unpacker [innoextract.exe](https://github.com/dscharrer/innoextract), has cmd line flag `--show-password` that we can utilize to get the password hash from the installer binary.
use `innoextract` with the `--show-password` flag on the installer binary
Output:

![castle loaer in detect it easy](images/blog/mal/casltleloader/hash.png)

From the output we can make three key observations that directly enable cracking:

1. **Algorithm identified** – `sha1($salt.utf16le($pass))`.  
   This tells us exactly how the password is transformed, so we can pick the correct Hashcat mode.

2. **Hash and salt extracted** –  
   `52eacbe922371c8deb1b1e0ac2cb79a0b31d12c8` (hash) and `5061737377...c4a053` (salt).  
   Without these, cracking is impossible. They give us the target and the fixed salt prepended to the password.

3. **Encoding specified** – UTF-16LE.  
   This prevents wasted attempts using wrong character encoding, which would otherwise produce a different hash and fail.

With these three pieces, we can construct a Hashcat command immediately:  
`-m 140 -a 0 --hex-salt` followed by `hash:salt`. The output also confirms the hash is SHA-1 (not salted directly but salt plus UTF-16LE password), so no guesswork. This turns an unknown password into a recoverable hash that can be cracked with a dictionary or brute‑force.

Combine hash and salt:

```
52eacbe922371c8deb1b1e0ac2cb79a0b31d12c8:50617373776f7264436865636b48617368d43d09a8a3c4a053
```

## Crack the Password with Hashcat

Run hashcat using a dictionary. In this case, I dumped strings from the executable using `strings .\joachim.bin > strings.txt ` and used that as the wordlist.

![castle loaer in detect it easy](images/blog/mal/casltleloader/hashcat.png)

Hashcat cracks it almost instantly:

The cracked password:
```
5No3#EU8FEeLUMRK8bmGW8$7$BAga$XW7*K%K&*kZ8B@%P!9KapxZJepz@8xt@fmufuKH7Qd36condg6jywsAnmZbYged^VPTkoMHuEqe3r7wGnKmKq4RJ4uu#j@xN*T
```

## Extract the Files

Save the password to a file (e.g., `pass.txt`) and run:

```
.\innoextract.exe --password-file .\pass.txt .\joachim.bin
```
Output:
![castle loaer in detect it easy](images/blog/mal/casltleloader/success.png)

Now all files extract successfully:

- `ARE.dll`
- `libdirect3d11_plugin.dll`
- `AutoIt3.exe`
- `freely.a3x`, `freely.xlsm`
- and others under `bin\`

## Next Steps

With the extracted files, we can now analyze each one to find the next stage. Keep an eye for the next post.
