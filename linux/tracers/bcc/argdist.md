Analizar como se está llamando a una syscall
Puede crear histogramas o número de llamadas para cada evento distinto

Ejemplo obteniendo las llamadas a nanosleep por parte de un proceso.
Obtenemos la duración del parámetro que se le pasa:
Generamos un histograma con las distribuciones de los valores usados de tv_nsec para llamar a la syscall nanosleep
argdist -p PID -H 'p::SyS_nanosleep(struct timespec *time):u64:time->tv_nsec'


argdist -p $(pidof server) -C 'p::SyS_nanosleep(struct timespec *time):u64:time->tv_nsec'
  en este caso nos da el número de llamadas por cada valor distinto de tv_nsec



Esquema para especificar donde tracear
{p,r,t,u}:{[library],category}:function(signature)[:type[,type...]:expr[,expr...][:filter]][#label]


Si por ejemplo queremos obtener el valor de retorno de una función usaremos una probe de exit y $retval
