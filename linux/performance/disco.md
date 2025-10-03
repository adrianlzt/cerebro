Mirar hardware/disco.md

Kernel tiene readahead (además del readahead del dispositivo):
Leer el parámetro:
blockdev --getra /dev/sda
cat /sys/block/sda/queue/read_ahead_kb
Modificar el parámetro
blockdev --setra 512 /dev/sda
echo "512" > /sys/block/sda/queue/read_ahead_kb

El readahead tiene como contrapartida que cada lectura tarda más.

Queue length:
cat /sys/block/sda/queue/nr_requests
Tamaño de la cola de peticiones a disco.
Un valor alto puede ser bueno porque ordena las peticiones y junta las peticiones más próximas en disco.
La desventaja es que la latencia es mayor.

<https://www.kernel.org/doc/Documentation/block/stat.txt>
/sys/block/<dev>/stat
Estadísticas sobre lecturas, escrituras, tiempos, etc

Info del fabricante:
cat /sys/block/sdb/device/{vendor,model}

# USE

Disk IO:
<http://blog.scoutapp.com/articles/2011/02/10/understanding-disk-i-o-when-should-you-be-worried>
<http://www.cmdln.org/2010/04/22/analyzing-io-performance-in-linux/>

pidstat -d 1

biolatency (BPF)
histograma de la latencia en IO de los procesos

Mirar escrituras y lecturas a los discos
vmstat -d
vmstat -p /dev/sda1 (se puede restringir a una sola partición)

Resumen sobre la escritura a disco
vmstat -D

Hay más comandos

# Para conocer los nombres de los discos cuando son tipo dev

lsblk
/proc/diskstats

# Nombres uuid

sudo blkid

# Notas de Systems performance - Brendan Gregg

Instead of using kernel statistics, event tracing can be used to
provide an accurate disk service time by measuring high-
resolution timestamps for the issue and completion for disk
I/O. This can be done using tools described later

While working in the enterprise storage industry, I considered any disk I/O taking over 10 ms
to be unusually slow and a potential source of performance
issues. In the cloud computing industry, there is greater
tolerance for high latencies, especially in web-facing
applications that already expect high latency between the
network and client browser. In those environments, disk I/O
may become an issue only beyond 50 ms (individually, or in
total during an application request).

disk can return two types of
latency: one for on-disk cache hits (less than 100 μs) and one
for misses (1–8 ms and higher, depending on the access pattern
and device type). Since a disk will return a mixture of these,
expressing them together as an average latency (as iostat(1)
does) can be misleading, as this is really a distribution with
two modes. See Figure 2.23 in Chapter 2, Methodologies, for
an example of disk I/O latency distribution as a histogram.

disk drive may perform optimally with 4 Kbyte
reads and 1 Mbyte writes. Ideal I/O sizes may be documented
by the disk vendor or identified using micro-benchmarking

There may also be a point between 0% and 100% (say, 60%)
at which the disk’s performance is no longer satisfactory due
to the increased likelihood of queueing, either on-disk queues
or in the operating system. The exact utilization value that
becomes a problem depends on the disk, workload, and
latency requirements. See the M/D/1 and 60% Utilization
section in Chapter 2, Methodologies, Section 2.6.5, Queueing
Theory.

A virtual disk that is 100% busy, and is built upon multiple physical
disks, may be able to accept more work. In this case, 100% may mean
that some disks were busy all the time, but not all the disks all the time,
and therefore some disks were idle.
Virtual disks that include a write-back cache may not appear very busy
during write workloads, since the disk controller returns write
completions immediately, even though the underlying disks are busy for
some time afterward.

You might assume that disks at less than 100% utilization have
no saturation, but this actually depends on the utilization
interval: 50% disk utilization during an interval may mean
100% utilized for half that time and idle for the rest. Any
interval summary can suffer from similar issues. When it is
important to know exactly what occurred, tracing tools can be
used to examine I/O events.

A more reliable metric is the time that application threads are
blocked on disk I/O. This captures the pain endured by
application threads caused by the disks, regardless of what
other work the CPUs may be doing. This metric can be
measured using static or dynamic instrumentation.
