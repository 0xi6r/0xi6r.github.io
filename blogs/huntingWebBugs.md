---
title: "Web Application Testing Workflow"
image: "images/blog/web/webhunting.png"
date: "2026-04-18"
excerpt: " Before letting AI do everything, this is how I used to start my bug hunting."
category: "Bug Bounty"
---

[![hunting workflow](images/blog/web/webhunting.png)]

Before automation and AI-driven tools became the norm, bug hunting required a more manual and methodical approach. I had to rely on structured workflows, curiosity, and hands-on exploration to uncover vulnerabilities. This is the process I used to follow when starting out.


## 1. Subdomain Enumeration

Tool: subfinder

```bash
subfinder -d example.com -all -recursive -silent -o subdomains.txt
```

This pulls subdomains from multiple sources and builds the foundation of the scope assessment.


## 2. Identify Live Subdomains

Tool: httpx

```bash
httpx -l subdomains.txt -silent -status-code -title -tech-detect -status-code -ip -o live_subdomains.txt
```

This step ensures you only work with subdomains that actually respond.



## 3. Historical Endpoint Discovery

Tool: waybackurls

```bash
cat subdomains.txt | waybackurls > wayback_urls.txt
```

This finds:

* deleted endpoints
* legacy APIs
* old admin panels
* forgotten functionality


## 4. Active Endpoint Discovery (Crawling)

Tool: Katana

```bash
katana -list live_subdomains.txt -depth 5 -js-crawl -jsl -rate-limit 5 -concurrency 5 -silent \
| grep -Ev "wp-content|wp-admin|wp-includes|xmlrpc\.php|wp-json" \
> active_endpoints.txt

(for some reason I don't like testing wordpress sites)
```

This discovers:

* hidden routes
* JS-based endpoints
* modern API endpoints


## 5. DNS & Infrastructure Information

Tool: dnsx

```bash
dnsx -l subdomains.txt -a -resp -silent -o ips.txt
dnsx -d example.com -a -aaaa -mx -ns -txt -silent > dns_info.txt
```

This helps identify:

* IP addresses
* shared infrastructure
* exposed mail/DNS records
* possible takeover opportunities


## 6. Domain Ownership & WHOIS Information

Tool: whois

```bash
whois example.com > whois_info.txt
```

Useful for:

* identifying infrastructure providers
* checking domain ownership patterns
* detecting related domains


## 7. Service Discovery & Version Detection

Tool: Nmap

```bash
nmap -iL ips.txt -sV -sC -T4 -Pn -oN services.txt
```

This reveals:

* open ports
* outdated services
* misconfigured servers
* forgotten exposed services


## 8. Automated Vulnerability Scanning

Tool: Nuclei

```bash
nuclei -l live_subdomains.txt -severity low,medium,high,critical -rate-limit 10 -o nuclei_results.txt
```

This helps quickly detect:

* known vulnerabilities
* exposed panels
* misconfigurations
* weak security headers


Optional deep scanner: Acunetix

Used for deeper automated analysis and hidden attack surface discovery.


## 9. Filter for Parameter Endpoints (High-Value Targets)

```bash
cat wayback_urls.txt active_endpoints.txt \
| grep "=" \
| sort -u \
> params.txt
```

Parameter endpoints are usually where:

* XSS happens
* IDOR vulnerabilities exist
* SSRF is possible
* SQL injection appears


## 10. Hidden Endpoint Discovery (Fuzzing)

Tool: ffuf

```bash
ffuf -u https://example.com/FUZZ -w /usr/share/wordlists/dirsearch.txt -mc 200,301,302,403 -rate 50 -o hidden.json
```

This finds:

* hidden admin panels
* internal tools
* forgotten endpoints
* exposed upload paths


## 11. Wordpress Scan

Tool: wpscan
```bash
(more aggressive scan)
wpscan --url https://example.com --api-token YOUR_API_TOKEN --enumerate ap,at,u --plugins-detection aggressive --random-user-agent --disable-tls-checks -o wpscan_full.txt
```
```bash
wpscan --url https://example.com --api-token YOUR_API_TOKEN --enumerate vp,vt,u --plugins-detection aggressive --random-user-agent -o wpscan_results.txt
```


## 12. Final Phase: Manual Testing & Exploitation

Tool: Burp Suite

This is where the real vulnerabilities are found.

Focus areas:

* authentication bypass
* IDOR
* broken access control
* business logic flaws
* XSS testing
* request manipulation
* parameter tampering


This workflow followed a simple strategy:

**Collect everything → Filter what matters → Focus only on exploitable attack surface**

What worked for you or is working for you?
