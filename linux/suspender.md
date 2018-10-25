https://www.kernel.org/doc/html/latest/admin-guide/pm/sleep-states.html#basic-sysfs-interfaces-for-system-suspend-and-hibernation
https://www.kernel.org/doc/html/latest/admin-guide/pm/sleep-states.html#system-sleep-states
Niveles de suspend soportados por el kernel:
cat /sys/power/state
cat /sys/power/mem_sleep
  para el suspend mem, que tipos tenemos disponibles
  deep es suspend to ram
cat /sys/power/disk
  tipos de suspend disk



systemctl suspend
Niveles de suspend soportados por systemd
suspend: a low-power state where execution of the OS is paused, and complete power loss might result in lost data, and which is fast to enter and exit. This corresponds to suspend, standby, or freeze states as understood by the kernel.
hibernate: a low-power state where execution of the OS is paused, and complete power loss does not result in lost data, and which might be slow to enter and exit. This corresponds to the hibernation as understood by the kernel.
hybrid-sleep: a low-power state where execution of the OS is paused, which might be slow to enter, and on complete power loss does not result in lost data but might be slower to exit in that case. This mode is called suspend-to-both by the kernel.
suspend-then-hibernate: A low power state where the system is initially suspended (the state is stored in RAM). If not interrupted within the delay specified by HibernateDelaySec=, the system will be woken using an RTC alarm and hibernated (the state is then stored on disk).



http://askubuntu.com/questions/1792/how-can-i-suspend-hibernate-from-command-line/131022#131022

dbus-send --system --print-reply  --dest="org.freedesktop.UPower"  /org/freedesktop/UPower  org.freedesktop.UPower.Suspend

Arch linux:
dbus-send --print-reply --system --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.Suspend boolean:true


# Niveles
standby ACPI state S1. This state offers minimal, though real, power savings, while providing a very low-latency transition back to a working system. This is the default mode.
mem ACPI state S3 (Suspend-to-RAM). This state offers significant power savings as everything in the system is put into a low-power state, except for memory, which is placed in self-refresh mode to retain its contents.
disk ACPI state S4 (Suspend-to-disk). This state offers the greatest power savings, and can be used even in the absence of low-level platform support for power management. This state operates similarly to Suspend-to-RAM, but includes a final step of writing memory contents to disk.
off ACPI state S5 (Poweroff). This is done by calling '/sbin/shutdown'. Not officially supported by ACPI, but usually working.


# Wakeup
Configurar que dispositivos pueden hacer waku-up de suspender
cat /proc/acpi/wakeup

Habilitar/deshabilitar un dispositivo:
echo "XHC" | sudo tee /proc/acpi/wakeup

En mi caso eso XHC era para que el raton inalambrico y el teclado usb puedan hacer wake up.

https://www.reddit.com/r/archlinux/comments/3zxg65/how_to_permanently_change_procacpiwakeup_or/
unit de systemd para deshabilitar en el arranque.
