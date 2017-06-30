perf record -g -F 997 -- ./primes
almacenamos en "perf.data" la ejecucción del programa "primes", tomando 997 muestras por segundo y almacenado call stacks (-g)
No se exactamente porque pero suelo ver que se samplea siempre con números tipo 997, 999 (siempre un poco menos de 1000)

perf record -g -a -F 997
almacenar en perf.data ejecucción de todo el sistema (hasta que demos a control+c)


perf record -g -F 997 -p 234,33246
almacenar llamadas de esos pids
