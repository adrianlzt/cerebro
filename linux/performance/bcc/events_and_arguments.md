# Tipos de eventos por los que podemos filtrar
https://github.com/iovisor/bcc/blob/master/docs/reference_guide.md#events-arguments

La herramienta tplist nos ayuda a obtener los eventos por los que podremos filtrar.
Parece que mira en /sys/kernel/debug/tracing/events
/sys/kernel/debug/tracing/available_events

También nos puede decir porque se puede filtrar de una libreria o binario en caso de tener USDT (mirar usdt.md)


There are currently three types of probes: kprobes, jprobes, and kretprobes (also called return probes).  A kprobe can be inserted on virtually any instruction in the kernel.  A jprobe is inserted at the entry to a kernel function, and provides convenient access to the function's arguments.  A return probe fires when a specified function returns. https://www.kernel.org/doc/Documentation/kprobes.txt

## kprobes
dynamic tracing of a kernel function call

Para ver las disponibles
ls /sys/kernel/debug/tracing/events/kprobes

Buscar una:
find /sys/kernel/debug/tracing/events/kprobes -iname "*sys*" |less

Aqui obtendremos una lista de las syscalls (creo que son estas, porque empiezan por sys).
Para usarlas tendremos que quitar el 'p_' del comienzo


Si es una syscall tendremos pagina man.
Para otras cosas podemos buscar en:
http://lxr.free-electrons.com/ident?i=do_rmdir


También podemos poner las kprobes en funciones de binarios.
Para ver los symbols donde nos podemos unir:
nm /path/binario

No podemos unirnos a todos los symbols, no me queda muy claro la regla que se sigue.
Para poder sacar el output correctamente tendremos que ver la definición de la función para saber que arg queremos sacar.

## kretprobes
dynamic tracing of a kernel function return
You can also use kretprobes by declaring a normal C function

Como las kprobes, pero nos provees del retval, que es el valor que ha retornado la función.


## tracepoints
Instrumentamos en tracepoints del kernel
Me parecio leer que es mejor intentarlo hacer aquí que en funciones, ya que estos puntos tienen a conservarse entre kernels.

/sys/kernel/debug/tracing/events/CATEGORY/EVENT/format


## uprobes
These are instrumented by declaring a normal function in C, then associating it as a uprobe probe in Python via BPF.attach_uprobe()

https://github.com/iovisor/bcc/blob/9b04a6ffeb7f7d7ba1a1d7df56571e938b6e1190/src/python/bcc/__init__.py#L577
Run the bpf function denoted by fn_name every time the symbol sym in the library or binary 'name' is encountered. The real address addr may be supplied in place of sym. Optional parameters pid, cpu, and group_fd can be used to filter the probe.  Libraries can be given in the name argument without the lib prefix, or with the full path (/usr/lib/...). Binaries can be given only with the full path (/bin/sh).
The group_fd argument allows event groups to be created.  An event group has one event which is the group leader (http://man7.org/linux/man-pages/man2/perf_event_open.2.html)

Example: BPF(text).attach_uprobe("c", "malloc")
         BPF(text).attach_uprobe("/usr/bin/python", "main")


## uretprobes
These are instrumented by declaring a normal function in C, then associating it as a uretprobe probe in Python via BPF.attach_uretprobe()


## usdt
Mirar usdt.md
