http://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/tree/Documentation/block/barrier.txt?id=09d60c701b64b509f328cac72970eb894f485b9e

Necesario para garantizar orden de las escrituras del journal en dispositivos con cache volatil. Si puedo garantizar que no habrá apagados bruscos puedo desactivarla.

barriers=0  # desactivado (mejor rendimiento)
barriers=1  # activado (peor rendimiento)

Los tunables de redhat lo desactivan para los perfiles con throughput.
