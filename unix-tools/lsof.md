Significado de la columna FD:
cwd		Current working directory
ltx		Shared library text (code and data)
mem		Memory-mapped file
mmap		Memory-mapped device
pd		Parent directory
rtd		Root directory
txt		Program text (code and data)
{digit}r	File descriptor opened read-only
{digit}w	File descriptor opened write-only
{digit}u	File descriptor opened read/write


El {digit} es el file descriptor del proceso (/proc/<PID>/fd/{digit})

lsof -P -> no traduce nombres de puertos


lsof -i TCP:80 # Show what processes are using port 80 either locally or remotely. Need to be root for unowned processes


lsof +D /dir
  ficheros abiertos debajo de ese directorio

lsof -c telegraf
  ficheros del proceso telegraf

lsof -c /[tT]elegr/
  se pueden poner regex

lsof -c /^t.*/ -c ^telegraf
  que empiezen por t pero no sea telegraf
