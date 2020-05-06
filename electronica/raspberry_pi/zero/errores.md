ugetrlimit(RLIMIT_STACK, {rlim_cur=8192*1024, rlim_max=RLIM_INFINITY}) = 0
--- SIGILL {si_signo=SIGILL, si_code=ILL_ILLOPC, si_addr=0x6c112} ---
+++ killed by SIGILL +++
Illegal instruction

Intentando arrancar un proceso para ARMv7, pero pizero es ARMv6

Ejemplo de binario no compatible
$ readelf -A /usr/sbin/grafana-server
Attribute Section: aeabi
File Attributes
  Tag_CPU_name: "7-A"
  Tag_CPU_arch: v7

