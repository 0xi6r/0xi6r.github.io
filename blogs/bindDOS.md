---
title: "BIND 9.3.6 Remote Denial of Service"
image: "/images/blog/bug-bounty/bind-dos/success.png"
date: "2026-06-23"
excerpt: "An immediate Denial of Service. The DNS server stops responding to all queries until the service is manually or automatically restarted."
category: "Bug Bounty"
---

![name server unreachable](/images/blog/bug-bounty/bind-dos/success.png)

It's late at night, I'm hunting with a slow jam playing when I discover the target nameserver is vulnerable to a DoS vulnerability that leads to Service Outage. The impact is an immediate Denial of Service; the DNS server stops responding to all queries until the service is automatically restarted. For any organization relying on ISC BIND versions 9.0.0 through 9.11.0rc1, this allows any unauthenticated remote attacker to take the service offline instantly. The specific version here is vulnerable to CVE-2016-2776 (BIND TSIG Query Denial of Service). It resides in the packet rendering logic (buffer.c) used when the server constructs a response to a DNS query containing a TSIG (Transaction Signature) record. There is no Confidentiality or Integrity loss: this specific flaw is a crash bug; it does not typically allow for Remote Code Execution (RCE) or data theft, though repeated exploitation can cause prolonged downtime.

### Target Information
```target
Target IP: CONFIDENTIAL (ns1.xxx.xx)
Service: DNS (Port 53/TCP & UDP)
Software: ISC BIND 9.3.6-P1 (Red Hat Enterprise Linux 5)
Specific Build: 9.3.6-25.P1.el5_11.8
Vulnerability: Remote Denial of Service via TSIG Processing
Exploit Used: Metasploit auxiliary/dos/dns/bind_tsig (CVE-2016-2776)
```


## Reconnaissance & Enumeration
The initial phase involved identifying the DNS service and its specific version. Alternative methods (dig, fpdns) successfully fingerprinted the software. 

Nmap Scan
An Nmap service version scan revealed the exact build string, indicating an outdated Red Hat Enterprise Linux 5 environment.

Output:
 ![nmap scan](/images/blog/bug-bounty/bind-dos/nmap.png)

## Version Verification (Dig & fpdns)
Direct queries for the version returned these: 

dig command (succeeded):

![dig confirm](/images/blog/bug-bounty/bind-dos/dig-confirm.png)
Result: status: version confirmed

fpdns command (succeeded):

![fpdns version confirmation](/images/blog/bug-bounty/bind-dos/fpdns.png)
Result: ISC BIND 9.2.3rc1 -- 9.4.0a4 [Old Rules]

This range confirms the target is running the vulnerable 9.3.x branch.

## Vulnerability Analysis
The identified build 9.3.6-25.P1.el5_11.8 is critically outdated.

OS Status: Red Hat Enterprise Linux 5 reached End of Life (EOL) in November 2020.
Missing Patches: The build is prior to the final security updates for RHEL 5, leaving it vulnerable to multiple Denial of Service (DoS) flaws.
Primary Vector: The Metasploit module auxiliary/dos/dns/bind_tsig targets CVE-2016-2776.  This flaw exists in the packet rendering logic where a specially crafted TSIG (Transaction Signature) query triggers an assertion failure in buffer.c, causing the named daemon to crash. 

## Exploitation
I used Metasploit Framework to launch the denial of service attack against the target. 
![Metasploit output confirming the packet was sent and module completed](/images/blog/bug-bounty/bind-dos/exploitation.png)

Execution Result
Upon running the module, Metasploit sent a malformed TSIG packet to the target. The module reported successful transmission. 

## Verification of Eploitation Success
To confirm the exploit worked, I used a secondary terminal to monitor the DNS service availability. Before the attack, the server responded (even if with REFUSED). After the exploit, the connection was actively refused, indicating the named process had terminated.

### Before exploitation
![before service exploitation](/images/blog/bug-bounty/bind-dos/response.png)


### After exploitation
![After service exploitation](/images/blog/bug-bounty/bind-dos/success.png)

The connection refused error confirms that port 53 is no longer listening because the service crashed. 

## Conclusion & Impact
The target name server ns1.XXX.XX is running an unsupported version of BIND on an EOL operating system. By leveraging CVE-2016-2776 via the Metasploit bind_tsig module, we successfully demonstrated a Remote Denial of Service. 

Impact: Any unauthenticated attacker can crash the DNS service at will, causing immediate outage for dependent services. 
Root Cause: The system is running BIND 9.3.6-el5_11.8, which lacks the patch for the TSIG buffer assertion failure. 
Remediation:
Immediate: Upgrade the operating system to a supported release (e.g., RHEL 8/9, AlmaLinux, Rocky Linux).
Software: Update BIND to the latest stable version (9.18.x or 9.20.x LTS).
Mitigation: If upgrades are impossible, restrict UDP/TCP port 53 access to trusted IPs only via firewall rules. 

### Confirming Service Availability using nmap
![final nmap scan showing port 53 closed](images/blog/bug-bounty/bind-dos/closed.png)
