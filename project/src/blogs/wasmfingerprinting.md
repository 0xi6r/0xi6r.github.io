---
title: "Browser Fingerprint"
image: "images/blog/wasm.png"
date: "2025-10-01"
excerpt: "A clever—and concerning—use of WebAssembly’s performance characteristics to bypass traditional anti-fingerprinting defenses. By exploiting subtle timing differences in how Chromium-based browsers handle WebAssembly-to-JavaScript setters, the technique achieves >99% accuracy in browser identification, even when the User-Agent is spoofed. While powerful for fraud detection, it underscores a growing privacy gap: as browsers harden surface-level identifiers, attackers (and defenders) are turning to microarchitectural and engine-level side channels. Mitigations like timing noise injection or high-resolution timer restrictions are promising but come with performance trade-offs. For now, this work is a wake-up call: true privacy requires deeper browser-level protections, not just cookie blocking."
category: "General"
---

A few months ago, I started wondering: **how much can a website really learn about me—even if I try to hide?** I’ve used privacy extensions, spoofed my User-Agent, cleared cookies, and even run browsers in VMs. But I kept hearing whispers in the infosec community about a new frontier in browser fingerprinting: **WebAssembly**.

So I dug in—and what I found surprised even me.

### The Limits of JavaScript Fingerprinting

For years, browser fingerprinting relied heavily on JavaScript. By measuring how long certain operations take—like rendering a canvas, querying installed fonts, or running math functions—attackers (or well-meaning fraud detectors) could build a semi-unique profile of your device.

But JavaScript is messy. Its performance swings wildly due to just-in-time (JIT) compilation, garbage collection pauses, and browser-specific optimizations. That noise makes fingerprints unreliable—especially across sessions or devices.

I wanted something more precise. Something closer to the metal.

### Enter WebAssembly: Fast, Predictable, and Surprisingly Revealing

WebAssembly (Wasm) is a low-level bytecode format that runs at near-native speed in every modern browser. Originally designed to bring C/C++/Rust apps to the web, it’s now everywhere—from games to crypto libraries.

But here’s what most people don’t realize: **subtle differences in how browsers implement the Wasm-JavaScript bridge can leak your browser’s true identity**—even when you’re pretending to be something else.

I built a fingerprinting method that doesn’t look at your screen resolution or fonts. Instead, it measures **how long it takes to call WebAssembly functions from JavaScript—and vice versa**. Specifically, I focused on operations like:

- Calling `Math.cos()` from inside a Wasm loop  
- Defining JavaScript object setters that trigger Wasm functions  
- Passing arguments between JS and Wasm in various configurations

These seem innocuous. But in practice, **Chromium-based browsers (Chrome, Edge) behave drastically differently than Firefox or Safari**—especially in tests involving *scripted setters*.

### The Smoking Gun: `wasm-scripted-setter` Tests

One test stood out. When I defined a JavaScript object property with a Wasm function as its setter (using `Object.defineProperty`), Chromium browsers took **5 to 8 times longer** than other operations. Firefox? Barely any slowdown.

I ran this across 158 browser instances—on Windows, macOS, Android, iOS, bare metal, and virtual machines (VMware, KVM, VirtualBox). The pattern held **everywhere except iOS**, where Apple’s strict runtime homogenizes behavior.

Even when I spoofed my User-Agent to pretend I was Firefox 33.0 on a Windows machine (see the paper’s Figure 9), my technique **correctly identified the real browser as Chrome**—with a false-positive rate under 1%.

### Why This Matters

This isn’t just academic. WebAssembly is now supported in **100% of major browsers**. And because it runs so fast and consistently, it’s perfect for high-fidelity fingerprinting.

For good actors, this could mean better fraud detection—spotting when a “returning user” is actually an imposter on a new device.

But for privacy-conscious users? It’s alarming. **Traditional anti-fingerprinting tools won’t stop this.** They focus on canvas, fonts, or WebGL—but not microsecond-level timing differences in Wasm-JS interop.

### Can We Fight Back?

Yes—but it’s tricky. In our paper, we proposed a mitigation: **inject random delays into setter functions** so that timing patterns become noisy and indistinguishable.

We also explored hooking WebAssembly exports to add jitter, and monitoring high-resolution timer usage (`performance.now()`) to detect fingerprinting scripts.

But these are band-aids. The real solution may require browsers to **normalize timing behavior** across implementations—or at least provide users with a “privacy mode” that disables high-precision timers and adds entropy to Wasm execution.

### Final Thoughts

WebAssembly was meant to make the web faster and more capable. And it has. But like every powerful tool, it can be repurposed—in ways its creators never intended.

As developers and users, we need to ask: **how much uniqueness are we willing to trade for performance?** Because in the world of browser fingerprinting, even a few milliseconds can give you away.

If you’re curious, check out this paper: [*Browser Fingerprinting Using WebAssembly*](https://arxiv.org/abs/2506.00719). And next time you visit a website… remember: it might know who you really are—even if you think you’re hidden.

—  
*Inspired by the research of Mordechai Guri and Dor Fibert at Ben-Gurion University. All experiments conducted ethically and with user consent in controlled environments.*
