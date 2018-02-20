stress --vm-bytes $(awk '/MemAvailable/{printf "%d\n", $2 * 0.9;}' < /proc/meminfo)k --vm-keep -m 1


Arrancar un proceso que consuma el 90% de la memoria available
https://unix.stackexchange.com/questions/99334/how-to-fill-90-of-the-free-memory
