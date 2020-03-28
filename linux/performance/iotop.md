Estadisticas IO por proceso

iotop
  -a acumulativo (no muestra throughput)
  -b no interactivo (scriptable, podemos redirigirlo a un fichero)
  -n <NUM> numero de ejecuciones antes de terminar
  -d <SEC> segundos entre interacciones
  -o solo mostrar procesos que están haciendo io

iotop -b -n 4 -d 3 -toPa
  modo bacth
  4 ejecuciones
  con un delay de 3"
  no mostrar threads (-P)
  solo procesos con valores (-o)
  valores acumulados (-a)
  mostrar hora (-t)

  %TID  identificador de hebra
  %PRIO  scheduling class y prioridad IO (para CFQ)
    Idle
         da acceso a disco cuando nadie más pide acceso a disco
	 se usa para procesos batch, que nos da igual cuanto tarde, simplemente que acabe
    be - Best-Effort 0-7 = (NI + 20)/5
         Clase por defecto
	 La asignación de la prioridad de io a cada servicio se hace siguiendo el nice con la fórmula de arriba.
	 Así un proceso con nice -20 tendría un be de 0 (el mejor)
    rt - Realtime
         si un proceso rt quiere disco, los procesos bf no cogen disco
	 Algunos procesos importantes se les da clase rt
	   migration/0
	   watchdog/0

  %SWAPIN  % de tiempo haciendo swap-in (a disco)
  %IO  % de tiempo esperando IO (lectura o escritura)
