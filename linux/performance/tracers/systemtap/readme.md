Es el Dtrace de linux.

Lenguaje de creación de sondas para monitorizar.

1.- Escribir un script describiendo que queremos observar
2.- stap lo traduce en un módulo del kernel
3.- stap carga el módulo y se comunica con él
4.- espera por tus cdatos

stap -v test.stp


El leguaje tiene cierto parecido a awk. Condición y función a cumplir.

Se ejecutan acciones cuando se llega a ciertos probe points.

Se puede programar con Eclipse para validación de código, autocompletado, colorear sintaxis, etc.


Se pueden programar facilmente cualquiera de las herramientras de traceo que existen.

No penaliza mucho al sistema, aunque lo suyo es no dejar sondas puestas (pero se podría si no es muy intensiva).



## SystemTap VS Dtrace ##
DTrace tiene mucho mejor soporte para java
SystemTap permite inyectar código c


SystemTap is the most powerful tracer. It can do everything: profiling, tracepoints, kprobes, uprobes (which came from SystemTap), USDT, in-kernel programming, etc. It compiles programs into kernel modules and loads them – an approach which is tricky to get safe. It is also developed out of tree, and has had issues in the past (panics or freezes). Many are not SystemTap's fault – it's often the first to use certain tracing capabilities with the kernel, and the first to run into bugs. The latest version of SystemTap is much better (you must compile from source), but many people are still spooked from earlier versions. If you want to use it, spend time in a test environment, and chat to the developers in #systemtap on irc.freenode.net. (Netflix has a fault-tolerant architecture, and we have used SystemTap, but we may be less concerned about safety than you.) My biggest gripe is that it seems to assume you'll have kernel debuginfo, which I don't usually have. It actually can do a lot without it, but documentation and examples are lacking (I've begun to help with that myself).


