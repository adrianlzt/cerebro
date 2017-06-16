https://github.com/brendangregg/perf-tools

Performance analysis tools based on Linux perf_events (aka perf) and ftrace
These are intended for Linux 3.2 and newer kernels. For Linux 2.6.x, see Warnings.
RHEL6 -> linux 2.6
RHEL7 -> linux 3.10

La mayoría de las tools usan ftrace, tres usan perf (perf-stat-hist, syscount, bitsize)


# Instalación
arch: yaourt -Ss perf-tools-git


# Tools
execsnoop: trace las llamadas a exec(), vemos que procesos se están lanzando system-wide. Nos dice PID y PPID
           con -t nos da el tiempstamp de cuando se ejecutaron, útil para encontrar short lived procs

killsoop: tracea llamadas kill
opensoop: tracea llamadas open
