Unit Type   File               Extension Description
Service     unit.service       A system service.
Target      unit.target        A group of systemd units.
Automount   units.automount    A file system automount point.
Device      units.device       A device file recognized by the kernel.
Mount       units.mount        A file system mount point.
Path        units.path         A file or directory in a file system.
Scope       units.scope        An externally created process.
Slice       units.slice        A group of hierarchically organized units that manage system processes.
Snapshot    units.snapshot     A saved state of the systemd manager.
Socket      units.socket       An inter-process communication socket.
Swap        units.swap         A swap device or a swap file.
Timer       units.timer        A systemd timer.

Directory                                Description
/usr/lib/systemd/system/system          Systemd units distributed with installed RPM packages.
/run/systemd/system/system               Systemd units created at run time. This directory takes precedence over the directory with installed service units.
/etc/systemd/system/system               Systemd units created and managed by the system administrator. This directory takes precedence over the directory with runtime units.
