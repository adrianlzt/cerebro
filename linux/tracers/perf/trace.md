perf record -g -F 997 -- ./primes
almacenamos en "perf.data" la ejecucción del programa "primes", tomando 997 muestras por segundo y almacenado call stacks (-g)
No se exactamente porque pero suelo ver que se samplea siempre con números tipo 997, 999 (siempre un poco menos de 1000)

sudo perf trace -T --duration 1000 python -c "import time; time.sleep(2)"
ejecuta ese comando y muestra las syscall que hayan durado más de 1s
tambien tracea hijos de la función

sudo perf trace -p PID
tracea ese PID (no tracea sus hijos)
En este podo puede que pierda paquetes, lo mostrará como:
"LOST 9 events!"
parece que no hace caso al --duration si usamos -p
podemos pasar varias -p 123,456,789



No podemos filtrar por ppid.
Una opción "cutre":
perf trace >& perf.trace
y luego analizar
Cuidado, en un sistema no excesivamente cargado generaba 1MB/s


Todo menos ciertos pids
--filter-pids 3,4,5
Si pongo muchos (todos los actuales del sistema) falla
