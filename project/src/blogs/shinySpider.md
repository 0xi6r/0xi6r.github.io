---
title: "ShinySp1d3r Ransomware Analysis"
image: "images/blog/shinySp1d3r.png"
date: "2025-12-8"
excerpt: "A Technical Analysis of ShinySp1d3r: A Go-Based Ransomware from the Scattered Lapsus$ Hunters"
category: "Malware Analysis"
---

# ShinySp1d3r Ransomware Static Analysis

<img width="1186" height="605" alt="background" src="/ai.png" />

## Summary
ShinySp1d3r is a Ransomware-as-a-Service (RaaS) platform, built by the Scattered Lapsus$ Hunters alliance: (ShinyHunters, Scattered Spider, and LAPSUS).
The ransomware uses ChaCha20 encryption, secured with an RSA-2048 key for file locking. It spreads through networks using Windows management tools like WMI, SCM, and Group Policy. 
To hinder recovery, it deletes shadow copies and wipes free space.
ShinySp1d3r employs a double-extortion model, stealing data before encryption and threatening to publish it on a Tor leak site if the ransom is unpaid. 
Its modular, cross-platform design, with future versions planned for Linux and ESXi, represents a significant advancement in ransomware capabilities.

Below is an image I borrowed from Any[.]Run showing the execution chain once the malware is executed.

<img width="1101" height="553" alt="Screenshot (47)" src="https://github.com/user-attachments/assets/58f9666b-0413-48d9-91ca-df2ed9d996d3" />

# Technical Analysis

## sample overview
- File type: PE64
- Extension: exe
- Architecture: AMD64
- Mode: 64-bit
- Language: Go
- Compiler: Go (1.18.X-1.24.0)
- Size: 5054468(4.82 MiB)
- Type: Console
- MD5:     2a48402392778959c0a448bcd093926a
- SHA1:    a2df8b213616da147bae2f4adf73a1af8df70b34
- SHA256:  e41dd341f317cb674ff12c83a17365e5c5aa3240d912ab3801ff4cf09a00ccb2


## String Analysis

