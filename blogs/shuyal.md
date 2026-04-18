---
title: "String Analysis of Shuyal Stealer"
image: "images/blog/mal/icarus/shuyal.png"
date: "2026-04-18"
excerpt: "Newly uncovered, Shuyal Stealer redefines the scope of browser-targeted malware. Moving beyond traditional variants that focus on Chrome and Edge, Shuyal targets 19 different browsers. This dramatic expansion makes it a uniquely versatile and dangerous threat for data harvesting."
category: "Malware Analysis"
fetured: true
---

Making an educated guess as to what the Shuyal stealer does based on its string data on Windows using the `strings.exe shuyal.bin > strings.txt` command.

## FILE INFO

- **MD5:** `9523086ab1c3ab505f3dfd170672af1e`
- **SHA256:** `8bbeafcc91a43936ae8a91de31795842cd93d2d8be3f72ce5c6ed27a08cdc092`

![DIe screenshot here](images/blog/mal/shuyal/info.png)

## Introduction

Shuyal Stealer is a sophisticated information-stealing trojan designed to harvest sensitive data from infected Windows systems. Based on the string analysis, its primary functions include extracting browsing history, cookies, and saved credentials from a wide range of web browsers, packaging the stolen data into a ZIP archive, and exfiltrating it to a command-and-control server via the Telegram Bot API. The malware also establishes persistence, disables security features like Task Manager, and cleans up its traces after execution.

This analysis was performed by running `strings.exe` on the sample binary to extract human-readable strings, providing a non-execution-based method to understand the malware's capabilities and potential indicators of compromise (IOCs).

## Is it signed?

Checking if the sample is signed using a valid certificate, unfortunately it is not.

![signature check](images/blog/mal/shuyal/singned.png)

## Analysis

Check out the next blog post where I load the sample in IDA for further analysis. As for this, I'll solely rely on the string data to make educated guesses about what the stealer does and possibly retrieve sample data that can be used to detect it.

### `strings.exe shuyal.bin > strings.txt`

#### Development Environment

The debug PDB path `C:\Users\sheepy\source\repos\SHUYAL_telegram\x64\Release\SHUYAL.pdb` suggests the project name was `SHUYAL_telegram`, and it was compiled in Release mode. The username `sheepy` is likely the original developer's system username.

![Strings from Shuyal](images/blog/mal/shuyal/dev.png)

#### Persistence & Anti-Analysis

![anti-analysis and persistence](images/blog/mal/shuyal/persist.png)

- **Persistence:** It copies itself to the Startup folder (`\svchost.exe`, `Executable added to Startup folder!`), ensuring it runs when the user logs in.
- **Self-Deletion:** It creates and runs a batch file (`util.bat`) that contains commands to delete the program's directory and then delete itself (`del /f /q "%~f0"`).
- **Defense Evasion:** It disables the Windows Task Manager by modifying a registry key (`DisableTaskMgr` under `Software\Microsoft\Windows\CurrentVersion\Policies\System`).

#### Data Packaging & Exfiltration

![exfil data to telegram bot](images/blog/mal/shuyal/exfil.png)

- It creates a ZIP archive of the collected data, as seen by the strings `Zipping directory with command:`, `Compress-Archive -Path`, and `runtime.zip`.
- It exfiltrates this data using the Telegram Bot API, evidenced by the presence of a bot token (`7522684505:AAEODeii83B_nlpLi0bUQTnOtVdjc8yHfjQ`) and API endpoints like `https://api.telegram.org/bot`, `/sendDocument?chat_id=`, and `Sending file: to Telegram...`.
- The program uses `powershell -Command` to perform actions like zipping, which is a common technique to leverage built-in OS tools and avoid writing its own archival code.

#### Browser Data Extraction

![browsers targets](images/blog/mal/shuyal/browser.png)

The most revealing strings are the paths to user data directories for many different browsers:

- **Chrome/Chromium:** `\Google\Chrome\User Data`, `\Chromium\User Data`
- **Firefox:** `\Mozilla\Firefox\Profiles\`, `firefox_profile`
- **Opera:** `\Opera Software\Opera Stable`
- **Brave:** `\BraveSoftware\Brave-Browser`
- **Vivaldi:** `\Vivaldi\User Data`
- **Edge:** `\Microsoft\Edge\User Data`
- **Others:** `Slimjet`, `Comodo`, `CocCoc`, `Maxthon`, `360Browser`, `Waterfox`, `Opera GX`

#### Targeted Data

It specifically looks for browser history (`History`, `history`, `visits`), cookies, and login data (`Login Data`). The presence of `encrypted_key` and `DPAPI decryption` suggests it decrypts browser-stored passwords.

![targeted data](images/blog/mal/shuyal/targets.png)

## Conclusion
By simply running `strings.exe` on the binary, we can correlate plaintext artifacts to map the malware's complete attack chain. The presence of browser profile paths, SQLite database names (`History`, `Login Data`), and `DPAPI` decryption strings confirms its role as an infostealer targeting credentials. Furthermore, hardcoded Telegram API tokens and `powershell` commands for zipping reveal the specific method of data exfiltration. This demonstrates that effective malware triage can often be performed without any code execution, relying solely on static string analysis.
