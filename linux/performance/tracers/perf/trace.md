sudo perf trace -T --duration 1000.0 python -c "import time; time.sleep(2)"
ejecuta ese comando y muestra las syscall que hayan durado más de 1s
tambien tracea hijos de la función

sudo perf trace -p PID
tracea ese PID (no tracea sus hijos)
