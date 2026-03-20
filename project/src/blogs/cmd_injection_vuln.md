---
title: "Remote Code Execution (RCE) in a CPE Management Web Application"
date: 2026-03-19
excerpt: "In this write-up, I explain a critical Remote Code Execution (RCE) vulnerability I found in a CPE management web application. I walk through how the vulnerability worked, how I discovered it, how it could be exploited through command injection, and what impact it could have on the server. The article also includes proof-of-concept steps, screenshots, and practical remediation recommendations."
featured: true
category: "Bug Bounty"
---

During a bug hunting session, I  discovered a  **Remote Code Execution (RCE)** in a web application that manages CPE devices and Base Station IPs. The issue was in the `/cpe.php` endpoint due to **improper server-side input validation** of the `cpe_ip` parameter.

I was able to  inject shell commands, allowing me to execute arbitrary operating system commands..

**Impact:**

* Execute arbitrary shell commands
* Extract sensitive system files
* Install persistence mechanisms
* Full server compromise


## Technical Details

The application allows users to:

* Retrieve a Base Station IP address
* Perform CPE checks

The `cpe_ip` parameter is **unsanitized** and passed to server-side shell commands, allowing **command injection**.


## Proof of Concept (PoC)

### 1. Retrieving Base Station IP

Users can input a Base Station name via the web interface. This generates a POST request like:

```http
POST /cpe.php
base_station=EXAMPLE&get_ip=GET+IP+Address
```

![Screenshot: Base Station IP request](/images/blog/find-ip.png)

The server responds with the IP address or a “not found” message if the Base Station does not exist.

### 2. CPE-CHECK Request Manipulation

Clicking **CPE-CHECK** generates a request such as:

```http
base_station=&cpe_ip=EXAMPLE&commission=CPE+check
```

The `cpe_ip` parameter is **user-controllable**. Modifying it with shell metacharacters allows command execution.

**Example payload:**

```bash
MY-IP;whoami;cat /etc/passwd
```

![Screenshot: Injecting commands into cpe\_ip](/images/blog/inject-cmd.png)


### 3. Successful Command Execution

Submitting the payload executes commands on the server. For example, contents of `/etc/passwd` can be retrieved.

```bash
MY-IP;whoami;cat /etc/passwd
```


![Screenshot: Successful command execution](/images/blog/success-response.png)


### 4. DNS-Based Validation

Using a domain under control instead of an IP triggers DNS requests visible in server logs. This confirms:

* User input is resolved externally
* Outbound DNS requests are allowed
* DNS-based exfiltration is possible


![Screenshot: DNS lookup evidence](/images/blog/dns-lookup.png)


## Impact

Exploiting this vulnerability allows an attacker to:

* Execute arbitrary commands on the server
* Extract sensitive data
* Install backdoors
* Move laterally within the internal network
* Abuse server resources

This is a **complete compromise scenario**.


## Root Cause

* Unsanitized user input passed to shell commands
* No validation of the `cpe_ip` parameter
* Likely use of insecure PHP functions: `system()`, `exec()`, `shell_exec()`


## Recommendations

1. **Strict input validation:** Only allow expected formats (IP addresses if applicable).

```php
filter_var($cpe_ip, FILTER_VALIDATE_IP)
```

2. Avoid passing **user input directly to shell commands**.
3. Use **safe APIs** instead of shell execution.
4. Apply **least privilege** to web server processes.
5. Review **server logs** for signs of prior exploitation.
6. Integrate **secure coding practices** in deployment workflows.

