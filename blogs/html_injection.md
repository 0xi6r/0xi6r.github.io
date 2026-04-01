---
title: "HTML Injection in Outbound Emails via Contact Form"
image: "images/blog/email-received.png"
date: "2026-04-01"
excerpt: "User input is not properly sanitized before being included in the email. This means that HTML content in the message is rendered directly in the email instead of being displayed as plain text. For example, submitting a message with basic HTML formatting results in that formatting being rendered in the received email."
category: "Bug Bounty"
fetured: false
---



During testing of a website’s contact form, I discovered a vulnerability related to **HTML injection** in outbound emails. This post explains what it is, why it matters, and how it can be mitigated.


## What Happened

![Screenshot: User enquiry contact form](/images/blog/contact-form.png)

The contact form allows users to submit their name, email, and a message. When the form is submitted, the application sends an email to the organization and optionally a copy to the sender.  

The problem is that **user input is not properly sanitized before being included in the email**. This means that HTML content in the message is rendered directly in the email instead of being displayed as plain text.

For example, submitting a message with basic HTML formatting results in that formatting being rendered in the received email.

![Screenshot: HTML Injected Successfully](/images/blog/email-received.png)

## Why This Is a Vulnerability

This behavior creates several risks:


- **Trusted-domain abuse**: Emails appear to come from the organization, so attackers can manipulate content in ways that look official.
- **Social engineering potential**: Attackers could craft messages that look legitimate to trick recipients.
- **Automatic processing by email clients**: External resources embedded in HTML can be loaded automatically, even before a recipient interacts with the email.

![Screenshot: External req made by email provider and user device](/images/blog/external-req.png)

While this issue doesn’t directly expose sensitive data, it **increases the risk of phishing and manipulation using the organization’s domain**.

## Steps to Reproduce (Safe Example)

1. Navigate to the contact page of the target.  
2. Enter a valid email address in the form.  
3. In the message field, submit a test message with harmless HTML formatting.  
4. Submit the form.  
5. Open the email received from the website. Observe that HTML content is rendered instead of shown as plain text.


## Expected Behavior

- User input should be treated as **plain text** in emails.  
- HTML tags should be escaped to prevent rendering.  
- No external resources should be loaded automatically from user input.

## Recommended Fix

- Sanitize and escape all user input before including it in emails.  
- Validate message content to prevent HTML injection.  
- Ensure emails display user content as plain text.  
- Review email templates to enforce strict output encoding.

## Conclusion

Contact forms are convenient, but when they allow HTML injection into emails, they open the door to potential abuse. Proper input sanitization and output encoding are essential to maintain trust in emails sent from your domain.
