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


LTTng has optimized event collection, which outperforms other tracers, and also supports numerous event types, including USDT. It is developed out of tree. The core of it is very simple: write events to a tracing buffer, via a small and fixed set of instructions. This helps make it safe and fast. The downside is that there's no easy way to do in-kernel programming. I keep hearing that this is not a big problem, since it's so optimized that it can scale sufficiently despite needing post processing. It also has been pioneering a different analysis technique, more of a black box recording of all interesting events that can be studied in GUIs later. I'm concerned about such a recording missing events I didn't have the foresight to record, but I really need to spend more time with it to see how well it works in practice. It's the tracer I've spent the least time with (no particular reason).


