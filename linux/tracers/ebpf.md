https://ebpf.io/
http://www.brendangregg.com/blog/2015-05-15/ebpf-one-small-step.html
https://suchakra.wordpress.com/2015/05/18/bpf-internals-i/
http://www.phoronix.com/scan.php?page=news_item&px=BPF-Understanding-Kernel-VM
https://github.com/torvalds/linux/tree/master/samples/bpf
bcc/esquema_funcionamiento.jpg
http://docs.cilium.io/en/latest/bpf/ explicación de como funciona en detalle
https://jvns.ca/perf-cheat-sheet.pdf
http://www.brendangregg.com/blog/2019-01-01/learn-ebpf-tracing.html

These are coming to Linux in the 4.x series
redhat7 usa 3.10
fedora26 4.11
ubuntu 16.04.2 LTS usa 4.8


# Comunicación
La comunicación entre el kernel space y el user space se puede producir mediante perf_events o "maps" (resúmenes de la utilización).
Esto consigue ser más eficiente evitando tener que hacer un dump de todos los datos al userspace para después procesarlos.

The extended Berkeley Packet Filter is an in-kernel virtual machine that can run programs on events, efficiently (JIT). It's likely to eventually provide in-kernel programming for ftrace and perf_events, and to enhance other tracers. It's currently being developed by Alexei Starovoitov, and isn't fully integrated yet, but there's enough in-kernel (as of 4.1) for some impressive tools: eg, latency heat maps of block device I/O. For reference, see the BPF slides from Alexei, and his eBPF samples.

One of the more interesting features in this cycle is the ability to attach eBPF programs (user-defined, sandboxed bytecode executed by the kernel) to kprobes. This allows user-defined instrumentation on a live kernel image that can never crash, hang or interfere with the kernel negatively.

Optimizado para interfaces de 10Gbps y más.


# Frontends
samples/bpf (raw)
bcc: python, c
linux perf_events

https://github.com/weaveworks/tcptracer-bpf


# Comunicación
La comunicación entre el kernel space y el user space se puede producir mediante perf_events o "maps" (resúmenes de la utilización).
Esto consigue ser más eficiente evitando tener que hacer un dump de todos los datos al userspace para después procesarlos.
