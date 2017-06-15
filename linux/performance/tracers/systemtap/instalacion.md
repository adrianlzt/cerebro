Paquetes:
RHEL:
  kernel-debuginfo
  kenel-devel

Debian:
  linux-image-$(uname -r)-generic-dbgsym


Conf kernel (necesario? debería meterlo en paquete):
  CONFIG_KPROBES=y
