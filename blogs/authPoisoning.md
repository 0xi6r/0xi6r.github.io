---
title: "Passwordless Authentication Poisoning via Host Header Manipulation"
image: "/images/blog/bug-bounty/auth-poisoning/success.png"
date: "2026-06-21"
excerpt: "A passwordless authentication mechanism vulnerable to host header manipulation, allowing us to capture authentication tokens"
category: "Bug Bounty"
---

![user-account](/images/blog/bug-bounty/auth-poisoning/success.png)

A passwordless authentication mechanism was vulnerable to host header manipulation, allowing an attacker to capture authentication tokens intended for other users and gain unauthorized access to their accounts.

## Vulnerability Details
![Page login](/images/blog/bug-bounty/auth-poisoning/PageSingUp.png)

The application provides a passwordless login feature that sends users an email containing a magic login link. The URL embedded in the email is generated using the value supplied in the `Host` header of the incoming request.

By intercepting the login request and replacing the original host with a Burp Suite Collaborator domain, the application generated a login link using the attacker-controlled domain and delivered it to the victim.

![modifying request with our payload](/images/blog/bug-bounty/auth-poisoning/modReq.png)


The victim receives an email containing a link similar to:

![token link](/images/blog/bug-bounty/auth-poisoning/link.png)

When the victim clicks the link, their browser sends a request to the attacker-controlled domain, exposing the authentication token.

![auth-token](/images/blog/bug-bounty/auth-poisoning/token.png)

The attacker can then extract the token and construct a legitimate login URL using the application's original domain:

```text
https://target-site.com/auth/login?token=eyJ...
```

Visiting this URL authenticates the attacker as the victim, resulting in full account takeover.

![user-account](/images/blog/bug-bounty/auth-poisoning/success.png)

## Impact

This vulnerability allows an unauthenticated attacker to compromise arbitrary user accounts, including privileged accounts, leading to complete account takeover.

## Remediation

Applications should never rely on user-supplied `Host` headers when generating absolute URLs for security-sensitive functionality. Instead:

* Use a hardcoded application base URL.
* Validate incoming `Host` headers against an allowlist of trusted domains.
* Consider using relative URLs where possible.
* Review all passwordless authentication flows to ensure tokens are not exposed to untrusted domains.

## CWE Classification

* CWE-346: Origin Validation Error
* CWE-601: URL Redirection to Untrusted Site ('Open Redirect') *(related)*
* CWE-640: Weak Password Recovery Mechanism for Forgotten Password
