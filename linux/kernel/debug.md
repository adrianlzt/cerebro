https://kernelnewbies.org/FAQ/LinuxKernelDebug101
https://wiki.ubuntu.com/Kernel/KernelDebuggingTricks
https://www.linuxtopia.org/online_books/linux_kernel/kernel_configuration/ch09s07.html

Podemos usar "printk()" para sacar cosas a /var/log/kern.log

FS con datos de debugging.
Puede que ya lo tengamos montado (mount | grep debugfs)
mount -t debugfs none /sys/kernel/debug

