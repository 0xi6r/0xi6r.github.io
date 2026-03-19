---
title: "Persistence: The Practical Guide to Maintaining Access"
date: 2026-02-18
excerp: "A practical and comprehensive guide to persistence techniques across Windows, Linux, Active Directory, macOS, and cloud environments."
Featured: false
category: "Red Team"
---

# Persistence: The Art of Maintaining Access

## Introduction

Gaining access to a system is only the first step. The real challenge is keeping that access. Systems reboot, users change passwords, patches get applied, and security tools improve constantly. Without persistence, any compromise becomes temporary.

Persistence allows access to survive:

- System reboots  
- Password changes  
- Security updates  
- Partial remediation by defenders  
- Endpoint re-imaging  

This article focuses on practical persistence techniques and when they should be used.

---

## Why Persistence Matters

A successful intrusion without persistence has limited value. Once the system restarts or credentials are reset, access disappears. This forces the attacker to repeat the initial compromise, which is usually harder the second time.

A strong persistence strategy provides:

### 1. Redundancy
Never rely on a single technique. If one method is discovered, another one should still work.

### 2. Stealth
The best persistence methods blend into normal system behaviour. Anything obvious will eventually be detected.

### 3. Reliability
Persistence must survive reboots, updates, and partial cleanup attempts.

---

## Choosing the Right Persistence Method

Before selecting a technique, consider the following:

1. Do you have administrator or root access?
2. Is the machine part of a domain?
3. Do you need persistence on one machine or across an entire environment?
4. Is stealth more important than reliability?

If you have low privileges, focus on user-level techniques.  
If you have administrator or root privileges, system-level persistence becomes possible.  
If the machine is domain-joined, domain persistence becomes the most powerful option.

---

## Persistence on Windows

Windows provides multiple built-in mechanisms that automatically run programs at startup or logon. Most persistence techniques take advantage of these mechanisms rather than creating new ones.

---

### Registry-Based Persistence

The Windows registry is one of the most reliable persistence locations because it is checked during every startup and logon.

Common targets include:

- User startup keys (no admin privileges required)
- System startup keys (requires administrator privileges)
- RunOnce keys (executed once after reboot)
- Logon-related registry entries

These methods are simple and reliable, but they are also heavily monitored. They are best used as backup persistence rather than the primary method.

---

### Scheduled Tasks

Scheduled tasks are one of the most flexible persistence methods on Windows. A task can be triggered by:

- System startup  
- User logon  
- Time intervals  
- Idle time  
- Specific system events  

Tasks can run as:

- A normal user  
- Administrator  
- SYSTEM (highest privilege)

Because scheduled tasks are legitimate system functionality, they often blend in better than obvious startup entries.

---

### Windows Services

Services run in the background and can be configured to start automatically when the system boots. This makes them effective for long-term persistence.

Advantages:

- Runs before a user logs in  
- Can run with SYSTEM privileges  
- Survives reboots automatically  
- Harder for inexperienced defenders to identify  

If stealth is important, modifying an existing service is usually less suspicious than creating a new one.

---

### WMI-Based Persistence

Windows Management Instrumentation (WMI) allows programs to execute automatically when specific system events occur.

Common triggers include:

- System startup  
- System uptime reaching a specific value  
- Changes in system configuration  

WMI persistence is more advanced because it does not rely on obvious startup entries and often leaves fewer visible artifacts.

---

### DLL Hijacking

Many Windows applications load dynamic libraries (DLLs). If an application attempts to load a DLL that does not exist in a secure location, it may search other directories.

If a malicious DLL is placed in one of those directories, it will be loaded automatically when the application runs.

Why it works well:

- No obvious startup entry  
- Uses legitimate software as the trigger  
- Can work without administrator privileges  

However, it requires more preparation than simple registry persistence.

---

## Active Directory Persistence

If a system is part of a domain, persistence on a single machine is not enough. The goal becomes maintaining access to the domain itself.

Domain persistence is more powerful because it is not tied to a specific computer.

---

### Privileged Account Persistence

If you control a domain administrator account, you already have persistence until that account is removed or reset.

Stronger persistence techniques include:

- Adding hidden permissions to accounts  
- Granting replication rights  
- Modifying access control lists  

These changes are often overlooked during incident response.

---

### Ticket-Based Persistence

Kerberos authentication relies on tickets. If authentication tickets can be created or manipulated, access can continue even after passwords change.

This is one of the most powerful persistence techniques because it bypasses normal authentication controls.

---

### Group Policy Persistence

Group Policy Objects (GPOs) control how machines behave in a domain. If a malicious change is added to a policy, it can affect every computer in the environment.

Examples include:

- Running a script during startup  
- Creating a scheduled task on all machines  
- Adding new users automatically  

This type of persistence survives even if individual machines are re-imaged.

---

## Persistence on Linux

Linux systems are simpler than Windows in many ways, but they still provide multiple persistence options.

---

### Cron Jobs

Cron jobs allow commands to run automatically at specific times.

Common triggers include:

- Every minute  
- At system startup  
- At specific times of day  

Cron-based persistence is easy to implement but also easy to detect if the system is audited regularly.

---

### SSH Key Persistence

Many Linux systems rely on SSH keys instead of passwords. If a new public key is added to the authorized keys file, access remains even if passwords are changed.

Advantages:

- Very reliable  
- Difficult to notice without careful inspection  
- Works even after password resets  

---

### System Services

Linux systems use services that start automatically when the system boots. Adding a new service or modifying an existing one provides strong persistence.

This method is more stable than cron-based persistence and works well for long-term access.

---

## macOS Persistence

macOS uses a different structure but the same idea: automatic execution at startup or login.

Common persistence methods include:

- Launch agents (user-level persistence)  
- Launch daemons (system-level persistence)  
- Login items  
- Library-based persistence  

---

## Cloud Persistence

Modern environments rely heavily on cloud platforms such as AWS, Azure, and Google Cloud. Persistence in cloud environments usually focuses on identity rather than systems.

---

### Access Keys

If long-term access keys are created for an account, access can continue even after the user changes their password.

---

### Hidden Accounts

Creating new users with high privileges is one of the simplest cloud persistence techniques. If the account name looks legitimate, it may remain unnoticed for a long time.

---

### Permission Changes

Instead of creating a new account, modifying permissions on an existing account can be more stealthy. This is harder to detect because the account itself already exists.

---

## Final Thoughts

Persistence is not about creativity. It is about reliability. The most effective techniques are usually the simplest ones that blend into normal system behaviour.

A strong persistence strategy should:

- Survive reboots  
- Survive password changes  
- Survive software updates  
- Survive partial cleanup attempts  

If persistence is done correctly, losing access to one system does not matter because access to the environment still exists.
