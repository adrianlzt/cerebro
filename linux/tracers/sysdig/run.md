## Formato ##
sysdig [parámetros] [chisels] [filtros]

Todos los fields:
sysdig -l

## Guardar información para analizarla posteriormente ##
sysdig -w fichero.scap
sysdig -w fichero.scap -n 100 <- guarda solo los primeros 100 eventos
sysdig -r fichero.scap [podemos poner filtros, parámetros, etc]


## Formato de salida ##
  Sin nada -> texto
  -x <- hexadecimal
  -X <- hexadecimal con una columa traducción a ASCII

  -s 300 <- captura 300 caracteres en vez de los 80 de por defecto (cuidado, puede hacer las capturas enormes!)
  -A <- human readable output
  -a <- absolute time

  ‘>’ indicates and enter event and ‘<’ indicates an exit event.

  -p "%proc.name %fd.name" <- imprime solo el nombre del proceso y el fichero (si ambos valores están disponibles)
  -p "*%proc.name %fd.name" <- imprime la línea con que uno de valores esté disponible (el otro será NA)
     "%evt.num %evt.time %evt.cpu %proc.name (%thread.tid) %evt.dir %evt.type %evt.args" <- formato por defecto

     evt.num 	is the incremental event number
     evt.time 	is the event timestamp
     evt.latency cuando tarda en ejecutarse
     evt.latency.s cuando tarda en ejecutarse en segundos
     evt.cpu 	is the CPU number where the event was captured
     proc.name 	is the name of the process that generated the event
     thread.tid is the TID that generated the event, which corresponds to the PID for single thread processes
     evt.dir 	is the event direction, > for enter events and < for exit events
     evt.type 	is the name of the event, e.g. 'open' or 'read'
     evt.args 	is the list of event arguments. In case of system calls, these tend to correspond to the system call arguments, but that’s not always the case: some system call arguments are excluded for simplicity or performance reasons.

   Formato de los file descriptors: num(<type>resolved_string)
     num is the FD number
     resolved_string is the resolved representation of the FD
     type is a single-letter-encoding of the fd type, and can be one of the following:
       f for files
       4 for IPv4 sockets
       6 for IPv6 sockets
       u for unix sockets
       s for signal FDs
       e for event FDs
       i for inotify FDs
       t for timer FDs
