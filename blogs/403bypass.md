---
title: "Techniques to Bypass 403 Forbidden Errors"
image: "/images/blog/bug-bounty/403bypass.png"
date: "2026-02-12"
excerpt: "A 403 Forbidden response means the server understood your request but refuses to let you in. Sometimes that protection can be fooled if the server checks your request in a narrow way. The ideas below show how small changes to your request can open doors that seem closed."
category: "Bug Bounty"
---

![403 bypass banner](/images/blog/bug-bounty/403bypass.png)

A 403 Forbidden response means the server understood your request but refuses to let you in. Sometimes that protection can be fooled if the server checks your request in a narrow way. The ideas below show how small changes to your request can open doors that seem closed.

## Primary Bypass Techniques

### 1. Change the request type

If you ask for a page with a normal GET and get a 403, try sending the same request as a POST, PUT, HEAD, PATCH, DELETE or OPTIONS. Servers sometimes only block the GET method and forget to lock the others.

Example: request POST /secret instead of GET /secret.

### 2. Pretend you are inside the network

Add extra information to your request that makes the server think you are a trusted internal user or the machine itself.

Common tricks include:

- Tell the server your address is 127.0.0.1 (the computer's own loopback) by adding fields like X-Forwarded-For, X-Originating-IP, X-Remote-IP or X-Client-IP.
- Override the requested path from inside the header by using X-Original-URL or X-Rewrite-URL and setting them to the restricted location.
- Change the host you are talking to by setting Host: localhost or Host: 127.0.0.1.

### 3. Tweak the path in the address

Many filters only look for an exact match of a forbidden word. You can often get past them by slightly rewriting the URL:

- Add a trailing slash, a dot, or a semicolon: /admin/ /admin/. /admin..;/
- Double up the slashes: //admin
- Encode characters: /%2e/admin (the dot is encoded) or /%2e%2e/admin (dot-dot).
- Play with upper/lower case: /Admin, /ADMIN.
- Use directory traversal symbols that sometimes get ignored: /./admin, /../admin.

### 4. Obfuscate with encoding

When the server decodes what you send, encoding parts of the path can slip past word filters.

- Single encoding turns each letter into its percent-code: /admin becomes /%61%64%6d%69%6e.
- Double encoding encodes the percent sign itself: /%252e/admin often becomes /./admin after two rounds of decoding.

## Additional Simple Techniques

### 5. Switch the web server's port or protocol

If the main website at https://example.com blocks you, try the same path on http://example.com, or on common alternative ports like 8080, 8443, or 443. Some internal panels only run on a separate port without the same access controls.

### 6. Append a fake file ending to the path

Many caching systems or security rules ignore requests that look like they are for static files. Add a harmless extension to the restricted address:

/admin.css /secret.js /dashboard.jpg.

Sometimes the server still returns the real page, but the filter thinks you asked for a stylesheet and lets it pass.

### 7. Confuse the server with extra parameters

Add random query parameters, or repeat the same parameter with different values. Examples:

/admin?anything /admin?foo=bar&foo=bar2.

This can break the rule that matches only the clean path and cause the server to serve the page.

### 8. Use a different host name

If the block is applied only to the main domain, try reaching the same server through its IP address, or through an alternative subdomain that points to the same place (like dev.example.com or internal.example.com). The same restricted folder might be open there.

### 9. Change the type of content you ask for

Some protections only apply when you request HTML. Set the Accept header to something unusual, such as application/json, text/plain, or image/*. The server may decide you are not a browser and skip the restriction.

### 10. Send a shortened or oversized request line

Shortening the path to its minimum (like just /) and then climbing up with ../ sequences can confuse path matching. Similarly, sending an extremely long URL or a request with many slashes and dots may overflow simple filters and let you through.

### 11. Use a different HTTP version or malformed request

Switching from HTTP/1.1 to HTTP/1.0 or even HTTP/0.9 sometimes changes how the server applies its security rules. Sending a request without a header, or with an unusual order, can have the same effect.

### 12. Add misleading referrer or origin information

Tell the server you came from an internal page:

Referer: https://example.com/admin/
Origin: https://localhost.

Some access rules check this and will trust a request that seems to originate from a safe place.

### 13. Use Unicode tricks or null bytes

Insert a null byte (%00) before the forbidden path: /%00/admin. Sometimes the underlying system cuts the string at that point and only sees /, then proceeds to serve /admin. Unicode look-alike characters can also bypass word matches that only check ASCII.

### 14. Send a request that looks like a different verb and body combined

If you send a request with a method like GET but with a body, or use the CONNECT method to tunnel, or try the TRACE method to see what the server echoes back, you may discover a hole that normal checks miss.

---

**Always remember:** these tricks work because of inconsistent server configurations. Test them only on applications you are allowed to examine, and use the knowledge to help owners tighten their defences.
