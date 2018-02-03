Traspas fosdem 2018 lttng

Basado en los kprobes del kernel.

Mejor que bcc para sacar metricas de continuo

Más dificil de instalar, necesita módulos para el kernel.
Se pueden cargar unos u otros módulos según que se quiera monitorizar.

Similar al comando perf.


LTTng has optimized event collection, which outperforms other tracers, and also supports numerous event types, including USDT. It is developed out of tree. The core of it is very simple: write events to a tracing buffer, via a small and fixed set of instructions. This helps make it safe and fast.

The downside is that there's no easy way to do in-kernel programming. I keep hearing that this is not a big problem, since it's so optimized that it can scale sufficiently despite needing post processing. It also has been pioneering a different analysis technique, more of a black box recording of all interesting events that can be studied in GUIs later. I'm concerned about such a recording missing events I didn't have the foresight to record, but I really need to spend more time with it to see how well it works in practice. It's the tracer I've spent the least time with (no particular reason).



Ejemplo de como capturar un problema de request latency
lttng.org/blog/2015/02/04/web-request-latency-root-cause/

Tiene herramientas x11 para analizar los reports.

Tiene módulos para capturar calls de python.
Hay que instalar un agente? usa USDT? corre en user space?


# Dudas
Version de kernel mínima?


# Install
apt-get install lttng-modules-dkms lttng-tools
modprobe lttng_kprobes


# Normal mode
lttng create
lttng enable-event --kernel --all --userspace --all
lttng start

lttng stop
lttng view
lttng destroy


# Live mode
Para examinar las trazas mientras estamos capturando tenemos que usar el Live Mode.
lltng create --live
  tambien -U para enviar las trazas a otro server


# Snapshot mode
memory only tracing (sin usar el disco)
Podemos hacer snapshots al disco cuando queremos (podemos poner triggers).
Podemos disparar el snapshot para almacenar el estado justo antes de que salte el trigger (ya que está haciendo buffering en memoria)

lttng create --snapshot

lttng snapshot record
  para generar una snaphost


# Rotation mode
Normal + snapshot

Generar trazas, guardarlas en un fichero e ir rotando cada cierto tiempo.

Ejecutar normal, lueog ejecutar
lttng rotate
Y obtendremos un fichero de las trazas hasta ese momento.
