---
title: "Broken Access Control: How an Unrestricted Signup Page Exposed Billing Data"
image: "images/blog/bug-bounty/bac.png"
date: "2026-10-22"
excerpt: "A missing signup restriction on a billing subdomain granted full access to customer transactions, tax records, and billing details spanning seven years."
category: "Bug Bounty"
featured: false
---

This was the easiest vulnerability I have found. By setting up an account and logging in, I obtained all billing information for the target.

Here is how I did it.

I used subfinder to enumerate subdomains within scope:

```
subfinder -d example.com -all -o subs.txt
```

I selected `billing.example.com` and used Burp Suite Pro to crawl the site while manually reviewing it in parallel.

The site presented a login screen. Standard credentials failed, and I did not want to brute force authentication. I looked for an alternative route.

The login page had no signup option. `robots.txt` contained nothing useful. Without credentials, the site appeared to be a dead end.

I returned to Burp Suite and reviewed the site map. I then used Burp's content discovery feature to brute force files and directories. A `signup` endpoint returned a 200 response. I opened it manually in the browser and the page loaded.

I registered with my own details and checked my email. No confirmation message arrived. I attempted to log in with the account I had just created. It worked.

The application did not restrict who could sign up. After authentication, the billing portal displayed every transaction the entity had processed from 2019 to 2026, including customer details and tax information.

The root cause was a missing authorization check on account registration. The signup functionality existed but was never restricted, allowing any visitor to create an account and access the full billing dataset.
