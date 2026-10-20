---
title: "Windows Forensic Artifact Analysis: Evidence of User and System Activity"
image: "images/blog/windows-forensic-artifacts.png"
date: "2026-10-20"
excerpt: "A guide to Windows forensic artifacts, including application execution, file access, deleted files, USB devices, browser history, user accounts, network activity, and cloud storage. Learn where these artifacts are stored and how they can support a digital forensic investigation."
category: "Red Team"
featured: True
---

# Windows Forensic Artifact Analysis: Evidence of User and System Activity

Windows systems preserve information about application execution, file access, connected devices, browser activity, user accounts, network connections, and other system events. These records are known as **forensic artifacts**.

During a digital forensic investigation, analysts examine these artifacts to understand what happened on a system, when an activity may have occurred, and which user or application may have been involved.

This guide summarizes useful Windows forensic artifacts, their common storage locations, and the evidence they may provide.

> **Important:** An artifact does not always prove that a particular action occurred exactly as it appears. Some records can be incomplete, overwritten, disabled, or affected by system updates. Correlate multiple artifacts before drawing conclusions.

## 1. Application Execution

Application execution artifacts can help establish whether a program was launched, how frequently it ran, and which files it accessed.

### 1.1 Prefetch

**Purpose**

Windows Prefetch helps applications start more efficiently by recording information about files and folders referenced during execution. Its records can provide evidence that an application ran.

**Location**

```text
C:\Windows\Prefetch
````

Files generally use the following naming format:

```
<EXENAME>-<HASH>.pf
```

The Prefetch feature can also be configured through this registry key:

```
SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management\PrefetchParameters
```

The `EnablePrefetcher` value controls Prefetch behavior. A value of `0` disables it, while `3` enables application-launch and boot prefetching.

Evidence and interpretation

A Prefetch file may contain:

- The last eight execution times.
- The total number of executions.
- Files and folders referenced by the application during its most recent recorded execution.

The file's creation and modification timestamps can help estimate the first and most recent executions associated with that Prefetch record. These timestamps should be interpreted carefully and correlated with other evidence.

Investigative value

Prefetch can help determine whether a suspicious executable was likely run, when it may have run, and which files it accessed during execution.

![Screenshot: Base prefetch directory](/images/blog/pref.png)

"For a file like 7ZG.EXE-997761F6.pf, analysts use tools like PECmd to extract the run count and the last eight execution timestamps, while the hash (997761F6) confirms the specific directory the executable was launched from—a detail that can distinguish a legitimate installation from a copy run out of a Temp folder."

### 1.2 UserAssist

Purpose

UserAssist records metadata about certain graphical applications launched through the Windows user interface.

Location

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\UserAssist\{GUID}\Count
```

Evidence and interpretation

UserAssist data can include:

- Application or shortcut paths.
- Last execution time.
- Execution count.
- Focus time and focus count.

Some values are ROT-13 encoded. The GUID identifies the type of execution being recorded.

Common GUIDs include:

- `CEBFF5CD-ACE2-4F4F-9178-9926F41749EA` — executable file execution.
- `F4E57C4B-2036-45F0-A9AB-443BCFE33D9F` — shortcut file execution.

Focus-time information is better used to identify general patterns than as an exact measurement of user attention.

Investigative value

UserAssist can support investigations into interactive application use, especially when combined with Prefetch and other execution artifacts.

Do not try to read the raw binary values manually. Load the NTUSER.DAT file into Eric Zimmerman's Registry Explorer or use RECmd. These tools will automatically navigate to the correct GUIDs, decode the ROT13 names, and parse the binary data so you can see the actual program name and run count.

![Screenshot: registry explorer](/images/blog/RegistryExplorer.png)

### 1.3 System Resource Usage Monitor (SRUM)

Purpose

The System Resource Usage Monitor database records information about application resource usage and network activity.

Location

```
C:\Windows\System32\SRU\SRUDB.dat
```

Related registry information can be found under:

```
SOFTWARE\Microsoft\Windows NT\CurrentVersion\SRUM\Extensions
```

Evidence and interpretation

SRUM is an Extensible Storage Engine (ESE) database. Important tables include:

- `{973F5D5C-1D90-4944-BE8E-24B94231A174}` — network data usage.
- `{d10ca2fe-6fcf-4f6d-848e-b2e99266fa89}` — application resource usage.
- `{DD6636C4-8929-4683-974E-22C046A43763}` — network connectivity usage.

Data is written periodically. The timestamp associated with a database entry represents when the entry was recorded, not necessarily the exact time the underlying activity occurred.

Investigative value

SRUM can help correlate applications with network usage and system resource activity.

![Screenshot: registry explorer](/images/blog/SrumECmd.png)

SRUDB.dat is a binary ESE (Extensible Storage Engine) database, so you cannot open it with a text editor or Registry Explorer. To read it, you must use a dedicated SRUM parser that understands this format and extracts the records into a readable table (usually CSV or Excel).

## 2. File and Folder Access

Windows maintains several artifacts that can reveal which files or folders were accessed, including recently opened documents and files stored on removable devices.

### 2.1 Windows Shortcut Files (LNK)

Purpose

Windows automatically creates shortcut files for certain files and folders opened by a user.

Common locations

```
%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Recent\
%USERPROFILE%\AppData\Roaming\Microsoft\Office\Recent\
```

LNK files can also exist in other locations.

Evidence and interpretation

Depending on the record, a shortcut may contain:

- The target file or folder path.
- File and folder timestamps.
- Volume information, including the volume name and serial number.

These records can help identify files accessed from local storage or removable media.

Investigative value

LNK files can help establish that Windows tracked access to a particular file and may connect that file to a specific storage volume.

![Screenshot: shortcut files](/images/blog/lnk.png)

### 2.2 Jump Lists

Purpose

Jump Lists record information about items associated with applications, including certain recently accessed files.

Investigative value

When available, Jump Lists can help identify documents or other items accessed through an application. They can complement LNK files and other recent-file records.

The precise information available depends on the application and the type of Jump List.

### 2.3 Microsoft Office Recent Files

Purpose

Microsoft Office maintains its own records of recently used items.

Registry locations

```
NTUSER.DAT\Software\Microsoft\Office\16.0\<AppName>\File MRU
```

For Microsoft 365, additional locations may include:

```
NTUSER.DAT\Software\Microsoft\Office\16.0\<AppName>\User MRU\LiveId_####\File MRU
NTUSER.DAT\Software\Microsoft\Office\16.0\<AppName>\User MRU\AD_####\File MRU
```

`<AppName>` refers to the relevant Office application. Office versions from 2016 onward, including Microsoft 365, use the version number `16.0` in these paths.

Evidence and interpretation

Recent-file entries can include the full file path and the last-opened time.

Investigative value

These records can help identify documents opened through Office applications and establish a timeline of document access.

### 2.4 Microsoft Office Reading Locations

Registry location

```
NTUSER.DAT\Software\Microsoft\Office\16.0\Word\Reading Locations
```

Evidence and interpretation

Reading Locations can record the last closed time and an encoded position within a document. When correlated with the last-opened time in the Office File MRU records, this information may help estimate a document-reading session.

### 2.5 Microsoft Office Trust Records

Purpose

Office stores trust decisions made when a user encounters a security warning for a document.

Registry location

```
NTUSER.DAT\Software\Microsoft\Office\<Version>\<AppName>\Security\Trusted Documents\TrustRecords
```

Evidence and interpretation

Trust records may identify:

- The document path.
- When the document was trusted.
- The permissions granted.

Investigative value

These records can help establish that a document was opened and that a user interacted with a security or trust prompt.

### 2.6 Microsoft Office Alerts

Purpose

Office applications generate alerts for certain actions, such as attempting to close a document without saving changes.

Location

```
%SYSTEMROOT%\System32\winevt\Logs\OAlerts.evtx
```

Evidence and interpretation

Office alert events use Event ID `300`. The event may include the application name and the message displayed to the user. Depending on the message, it may also identify a related file.

Investigative value

Office alert logs can provide additional context about activity within Office applications.

### 2.7 Internet Explorer `file:///` Records

Purpose

The Windows web cache database can contain records of local files and remote files accessed through paths represented as `file:///`.

Location

```
%USERPROFILE%\AppData\Local\Microsoft\Windows\WebCache\WebCacheV*.dat
```

Evidence and interpretation

An entry may resemble:

```
file:///C:/directory/filename.ext
```

This does not necessarily mean the file was opened in a web browser. The database uses the Extensible Storage Engine (ESE) format and may also contain browser history from other applications without clearly identifying the source application.

Investigative value

These entries can provide leads about file access, including activity involving network shares.

## 3. Deleted Items and File Existence

Deleted files do not always disappear immediately from the underlying storage. Some filesystem records can remain available until the space is reused.

### 3.1 Master File Table (MFT)

Purpose

On NTFS volumes, the Master File Table maintains records for files and folders. When an item is deleted, its record may be marked for reuse without being overwritten immediately.

Locations

```
C:\$MFT
C:\$MFTMIRR
```

`$MFTMIRR` is a backup of the MFT.

Evidence and interpretation

- Each MFT record is 1,024 bytes.
- Small files may be stored within their own MFT record. These are known as MFT-resident files.
- Records may contain metadata and information about Alternate Data Streams (ADS).
- Deleted entries may remain recoverable until they are reused or overwritten.

Investigative value

MFT analysis can help establish that a file or folder existed and may provide metadata useful for reconstructing file activity.

Recoverability depends on the condition of the filesystem and whether the relevant data has been overwritten.

### 3.2 Windows Search Database

Purpose

Windows Search indexes file metadata and, where supported, content to make searching faster. This index can preserve evidence about files that were present or indexed on the system.

Location

```
C:\ProgramData\Microsoft\Search\Data\Applications\Windows\
```

Database files vary by Windows version:

Windows 11 and later

```
Windows.db
Windows-gather.db
```

`Windows.db` is a SQLite database containing indexed data. `Windows-gather.db` stores information about indexed files and folders, including identifiers and parent-folder information.

Windows 7–10

```
Windows.edb
GatherLogs\SystemIndex\*.gthr
```

`Windows.edb` is an ESE database containing indexed data. Gather log files can record activity collected for re-indexing; together, they typically cover less than a week.

Evidence and interpretation

Windows Search has two main modes:

- Classic: Generally indexes common user folders, such as Documents, Pictures, Music, and Desktop.
- Enhanced: Indexes a broader range of files and folders across the PC.

For most files, metadata is indexed by default. Text content may also be indexed for files containing searchable text.

Investigative value

Search databases can provide evidence about indexed files, their metadata, and—in some cases—their content. The presence of an entry does not by itself establish that a user opened the file.

### 3.3 User-Typed Paths

Purpose

Windows records paths entered directly into the File Explorer address bar.

Registry location

```
NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths
```

Investigative value

Typed path records can indicate that a user entered a particular location into File Explorer. They do not necessarily prove that the target file was opened or that access succeeded.

## 4. USB Devices and External Storage

USB-related artifacts can help identify devices connected to a Windows computer and files accessed from removable media.

### 4.1 USB Device Identification

Purpose

Windows records information about connected USB devices and other hardware.

Registry locations

```
SYSTEM\CurrentControlSet\Enum\USBSTOR
SYSTEM\CurrentControlSet\Enum\USB
SYSTEM\CurrentControlSet\Enum\SCSI
SYSTEM\CurrentControlSet\Enum\HID
```

Evidence and interpretation

Depending on the device and available records, these locations may help identify its vendor, product, and device-specific identifiers.

### 4.2 USB Volume Information

A volume boot record (VBR) contains a Volume Serial Number (VSN).

Relevant VSN offsets include:

- FAT: 4 bytes at offset `0x43`.
- exFAT: 4 bytes at offset `0x64`.
- NTFS: 8 bytes at offset `0x48`.

Volume information may also be reflected in shell-item data associated with shortcut files.

Investigative value

The volume name and serial number can help correlate files referenced in LNK records with a particular storage volume.

### 4.3 USB Connection Timestamps

Purpose

Windows may record information about device installation and connection activity. However, a complete history of every connection may not be retained.

Registry location

```
SYSTEM\CurrentControlSet\Enum\USB\Disk&Ven_&Prod_\<iSerial#>\Properties\{83da6326-97a6-4088-9453-a19231573b29}\####
```

Relevant property identifiers include:

- `0065` — first connection.
- `0066` — last connection.
- `0067` — last removal.

Other sources include:

```
C:\Windows\inf\setupapi.dev.log
C:\Windows\System32\winevt\Logs\System.evtx
C:\Windows\System32\winevt\Logs\Microsoft-Windows-Partition%4Diagnostic.evtx
```

Relevant event IDs include:

- `20001` and `20003` in the System log for attempted Plug and Play driver installation, typically associated with the first connection.
- `1006` in the Partition Diagnostic log for device connect/disconnect activity.

Some logs may be cleared during major operating-system updates.

Timestamp considerations

- Registry timestamps are stored in UTC using Windows 64-bit FILETIME format.
- `setupapi.dev.log` timestamps use the local time zone.

Investigative value

These records can help establish when a device was first installed, when it was last connected or removed, and whether a file may have been accessed from that device.

### 4.4 USB Device Usage Through Shell Items

Purpose

LNK files and Jump Lists may preserve information about files and folders accessed on removable media.

Common locations

```
%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Recent\
%USERPROFILE%\AppData\Roaming\Microsoft\Office\Recent\
```

Evidence and interpretation

Embedded shell-item data may contain volume information, including the volume name and serial number, alongside timestamps associated with the target item.

Investigative value

Combining shell-item data with USB registry records can help link file access to a particular removable storage volume.

## 5. Browser Activity

Browser artifacts can help reconstruct visited websites and related activity. The amount of information available depends on the browser, its settings, the user profile, and whether data has been deleted.

### 5.1 Browser History

Purpose

Browser history databases record websites visited and associated timestamps. They may also record how frequently a site was visited.

Firefox

```
%USERPROFILE%\AppData\Roaming\Mozilla\Firefox\Profiles\<random text>.default-release\places.sqlite
```

Google Chrome

```
%USERPROFILE%\AppData\Local\Google\Chrome\User Data\<Profile>\History
```

Microsoft Edge

```
%USERPROFILE%\AppData\Local\Microsoft\Edge\User Data\<Profile>\History
```

Evidence and interpretation

- Browser artifacts are stored separately for local user profiles.
- Chromium-based browsers may have several profiles, such as `Default` and `Profile1`.
- History may include visit timestamps and visit frequency.
- Private-browsing activity is generally not retained in the normal history database, although other artifacts may still exist.

Investigative value

Browser history can help establish which websites were visited and support the reconstruction of a user's browsing timeline.

### 5.2 Browser URL Parameters

Purpose

URL parameters can contain information that provides clues about browsing activity, network access, and potential location-related searches.

For example, mapping URLs may include destination addresses or geocoding parameters.

Investigative value

URL parameters can provide additional context beyond the domain name. They may reveal search terms, destination details, or clues about networks accessed through captive portals.

Treat such information carefully: a URL can indicate a requested destination or search, but does not necessarily prove that the user physically visited that location.

## 6. Network and System Information

System and network artifacts can help identify network interfaces, previously connected networks, and some aspects of application network activity.

### 6.1 Network Interfaces

Purpose

Windows stores configuration information about physical and virtual network interfaces.

Registry locations

```
SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces
SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkCards
```

Evidence and interpretation

The Interfaces key may contain:

- Last-known IP address information.
- DHCP configuration.
- Domain information.
- Historical network configuration in some subkeys.

The NetworkCards key provides additional information about network adapters. The two locations can be correlated using the interface GUID.

Investigative value

These records can help identify network configurations used by a system. They are unlikely to provide a complete record of every network connection.

### 6.2 Network History

Purpose

Windows records information about network profiles to which a computer has connected.

Registry locations

```
SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged
SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Managed
SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Nla\Cache
SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Profiles
```

Evidence and interpretation

Available information may include:

- Network or domain names.
- Wireless SSIDs.
- First and last connection times.
- Gateway MAC addresses.
- Network profile types.

Some `NameType` values identify the connection type:

- `6` (`0x06`) — wired.
- `23` (`0x17`) or `53` (`0x35`) — VPN.
- `71` (`0x47`) — wireless.
- `243` (`0xF3`) — mobile broadband.

Network profile timestamps may be stored as 128-bit system time in the local time zone.

Investigative value

Network history can help identify previously used networks and support timeline reconstruction. It should not be treated as a complete record of all network activity.

### 6.3 WLAN Event Log

Purpose

The WLAN AutoConfig operational log can provide historical information about wireless network associations.

Location

```
C:\Windows\System32\winevt\Logs\Microsoft-Windows-WLAN-AutoConfig%4Operational.evtx
```

Investigative value

This log can help investigate wireless connectivity events and supplement the network profile information stored in the registry.

## 7. Cloud Storage

Cloud-storage applications may leave local configuration files, databases, caches, and synchronization records. These artifacts can help connect local files to cloud-storage activity.

### 7.1 Dropbox

Default local storage

```
%USERPROFILE%\Dropbox
```

Cached files

```
%USERPROFILE%\Dropbox\.dropbox.cache
```

The cache may contain data retained for up to three days, depending on the circumstances.

Configuration and metadata

```
SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\SyncRootManager\Dropbox!<SID>!Personal\UserSyncRoots
```

Application data may be found under:

```
%USERPROFILE%\AppData\Local\Dropbox\
```

Relevant files include:

```
nucleus.sqlite3
sync_history.db
aggregation.dbx
info.json
```

Evidence and interpretation

Dropbox artifacts may contain metadata about local, cloud, and deleted files, as well as application configuration and usage information.

The source notes that Dropbox does not store file hashes in these artifacts. Deleted files may exist in both local and online recycle bins. Online retention periods vary by account type and service policy.

Business plans may provide more detailed logging than consumer accounts.

Investigative value

Dropbox artifacts can help investigate file synchronization, cloud-storage use, and the relationship between local files and cloud records.

## 8. Building a Reliable Forensic Timeline

Individual artifacts rarely tell the complete story. A stronger investigation correlates records from several sources.

For example, when investigating a suspicious executable, an analyst might compare:

1. Prefetch to assess whether the executable ran and which files it referenced.
2. UserAssist to look for evidence of interactive execution.
3. LNK files and Jump Lists to identify related file access.
4. SRUM to examine associated application resource or network usage.
5. Windows event logs to add system-level context.
6. Network artifacts to examine relevant connectivity information.

For a suspected USB data-transfer incident, an analyst might compare device identification and connection records with volume serial numbers in shell items and the timestamps of files referenced by those records.

For browser investigations, browser history, URL parameters, user-profile information, and relevant network artifacts may provide complementary evidence.

### Timestamp considerations

Windows artifacts do not all use the same timestamp format or time zone. Some timestamps represent the time an event occurred, while others represent when data was written, updated, or recorded.

During analysis:

- Identify the timestamp format used by each artifact.
- Confirm whether timestamps are in UTC or local time.
- Account for time-zone differences when correlating records.
- Consider clock inaccuracies and changes to system time.
- Avoid treating a file's creation or modification time as conclusive proof of execution or access.

## 9. Limitations and Best Practices

Windows forensic artifacts are valuable, but each has limitations.

- Retention: Some records are overwritten, rotated, or removed over time.
- Configuration: Artifacts may be missing if a feature was disabled or configured differently.
- Operating-system differences: Paths, database formats, and behavior can vary between Windows versions.
- User context: Many artifacts are stored separately for each user profile.
- Interpretation: An artifact may indicate that a file existed, was referenced, or was tracked by the system without proving that a person intentionally opened it.
- Corroboration: Important findings should be supported by independent evidence wherever possible.
- Preservation: Preserve the original evidence and document the acquisition and analysis process. Use appropriate forensic procedures to maintain integrity.

## Conclusion

Windows systems preserve a wide range of artifacts that can support investigations into application execution, file access, deleted data, USB usage, browser activity, network connections, and cloud-storage activity.

Understanding where these artifacts are stored—and what they can and cannot prove—helps analysts reconstruct system activity and develop more reliable forensic timelines.

The most useful findings usually come from correlating several artifacts rather than relying on a single registry key, log, or timestamp.

## Source

This guide is adapted from Windows Artifact Analysis: Evidence of..., a forensic reference poster by Kathryn Hedley, SANS Institute, document code `DFPS_FOR500_10-26`, copyright 2026.

Artifact availability and behavior may vary by Windows version, configuration, and the condition of the evidence.

```

Before publishing, check that `images/blog/windows-forensic-artifacts.png` matches the actual image path in your project. I also corrected `fetured` to `featured` in the frontmatter and used `Digital Forensics` as the category.
```
