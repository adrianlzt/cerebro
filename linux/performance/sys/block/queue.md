dia3-io/io-tunables step-4

nomerges: evitar que haga merges

rq_affinity: peticiones de IO que siempre se hagan con la misma CPU

rotational: poner a 0 si el disco es no rotacional (debería ponerse solo). Perderíamos un montón de optimizaciones.

scheduler: mirar que scheduler existen y cual tenemos seleccionado (entre corchetes)

read_ahead_kb: cuantos bloques más se leeran en cada acceso a disco

max_sectors_kb: max req size sent to disk. Se puede probar a mover entre 512kB y 1MB y testeando con izone si va mejor

nr_request: longitud de la cola, para reducir la latencia poner la cola a 1. Si la cola está llena la petición se queda bloqueada intentando entrar en la cola




