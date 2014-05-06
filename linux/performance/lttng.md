Basado en los kprobes del kernel.

Más dificil de instalar, necesita módulos para el kernel.
Se pueden cargar unos u otros módulos según que se quiera monitorizar.

Similar al comando perf.

apt-get install lttng-modules-dkms lttng-tools
modprobe lttng_kprobes
lttng create
lttng enable-event --kernel --all --userspace --all
lttng start

lttng stop
lttng view
lttng destroy
