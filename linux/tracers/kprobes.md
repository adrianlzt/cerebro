https://www.kernel.org/doc/Documentation/kprobes.txt
https://lwn.net/Articles/132196/

linux-2.6.9
write probe hooks in kernel module

Inserta unos trozos de programa en un punto determinado de la memoria.
Tiene acceso a los valores de los registros de la CPU

La userspace se llama Uprobe (linux-3.5)
En kernel están las kprobes, kretprobe (con valor retornado) y las jprobes (estas seguramente desaparezcan)



# Uprobes
echo 'p:myapp /bin/bash:0x4245c0' > /sys/kernel/tracing/uprobe_events


# Kretprobes
echo 'r:myretprobe do_sys_open $retval' >> /sys/kernel/tracing/kprobe_events
echo 1 > /sys/kernel/tracing/events/kprobes/myretprobe/enable

cat /sys/kernel/tracing/trace




# USDT: user statically-defined tracing
Ejemplo de uprobes metidas en MySQL: https://github.com/MariaDB/server/blob/10.2/include/probes_mysql.d.base

USDT probes de una aplicación o librería: usando tplist (bcc-tool).
Los binarios generalmente no están compilados con este soporte (http://www.brendangregg.com/blog/2016-10-12/linux-bcc-nodejs-usdt.html)




# BCC
Cuando usamos bcc con una kprobe, por ejemplo con trace.py, lo que hace es generar un dir en:
/sys/kernel/debug/tracing/events/uprobes/NOMBRE

# A mano
https://events.linuxfoundation.org/slides/lfcs2010_hiramatsu.pdf
Obtener eventos de kprobes "a pelo", sin bcc ni otro framework:

<Analyze Binary>
grep vfs_read /proc/kallsyms
objdump -Sd vmlinux --start-address=0x.... | less

<Add Event>
echo 'p vfs_read+.. %di +0x3c(%di):u32' >> kprobe_events

<Show Event>
cat events/kprobes/p_vfs_read_../format
cat kprobe_events

<Trace Event>
echo 1 > events/kprobes/p_vfs_read_../enable
cat trace

<Delete Event>
echo '- p_vfs_read_..' >> kprobe_events
