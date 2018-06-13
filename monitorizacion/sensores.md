http://www.lm-sensors.org/
https://web.archive.org/web/20150905145034/http://www.lm-sensors.org/
lm_sensors

Nos da info sobre el hardware.
Ejecutar como root

Ejecutar:
sensors

Para parsear:
sensors -A -u

sensors-detect
  este programa hace pruebas para encontrar que sensores tenemos instalados y cargar los módulos del kernel necesarios para poder leerlos
  las pruebas van en orden creciente de peligrosidad
    Do you want to scan for them? This is totally safe. (YES/no):
    Some Super I/O chips contain embedded sensors. We have to write to standard I/O ports to probe them. This is usually safe.  Do you want to scan for Super I/O sensors? (YES/no):
    This is normally safe. Do you want to scan for IPMI interfaces? (YES/no):
    Some hardware monitoring chips are accessible through the ISA I/O ports.  We have to write to arbitrary I/O ports to probe them. This is usually safe though. ... Do you want to scan the ISA I/O ports? (yes/NO):
    Lastly, we can probe the I2C/SMBus adapters for connected hardware monitoring devices. This is the most risky part, and while it works reasonably well on most systems, it has been reported to cause trouble on some systems.  Do you want to probe the I2C/SMBus adapters now? (YES/no):
    Luego otras preguntas según lo que vaya encontrando si queremos analizarlo todo o no

  Al final nos muestra una lista de lo que ha encontrado, con que nivel de confianza y los módulos del kernel que hariá falta cargar en /etc/modules
  Podemos decirle que escriba esos modulos en el fichero automáticamente (si ya existían las entradas, las vuelve a meter, no lo comprueba).
  Parece que hace falta recargar kmod para que puedan leerlo los programas de monitorización
    service kmod restart
    systemctl restart systemd-modules-load.service

  En Arch linux sensors-detect carga los modulos en /etc/conf.d/lm_sensors, luego el script de arranque hace source de este fichero y carga los modulos del kernel que estén definidos.
  En el arranque solo hace un "modprobe" de los modulos que pongamos y luego los quita al parar el service.

  Haciendo pruebas en mi portatil he dejado de ver los sensors de coretemp (coretemp-isa-0000). No se muy bien si por culpa del sensors-detect o por que. No se si tras reiniciar se recuperarán.

  para aceptar todo (puede ser peligroso): yes YES | sensors-detect

sensors
  mirar valores

He visto algunas inconsistencias en ciertas ejecucciónes:
in6:          +3.06 V  (min =  +4.05 V, max =  +1.79 V)  ALARM


# Conf
En /etc/sensors3.conf vienen por defecto configuraciones genéricas para ciertos chips que no cambian entre placas base.

Podemos meter configuraciones para cambiar labels tipo "in4" por un nombre descriptivo: fan1
Esa info nos la tiene que dar el fabricante de la placa base.
Aquí hay una recopilación de configuraciones para diferentes fabricantes y modelos:
https://github.com/groeck/lm-sensors/tree/master/configs

Por ejemplo en esta https://github.com/groeck/lm-sensors/blob/master/configs/SuperMicro/X8DTN.conf
Se ignora un chip por completo (donde teóricamente está indicado si hay un fallo de energía) y luego se da labels a otros inputs de otro chip.
También se hacen unas divisiones/mulitplicaciones para obtener el valor correcto.


# Internals
Mirando como funcona veo que lee ficheros de
/sys/class/hwmon

Tambien parece que busca cosas en /sys/class/i2c-adapter/



# Agentes
xsensors muestra graficamente los valores

Con telegraf podemos recuperar estos valores

s-tui
  interfaz ncurses para ver fan, power, freq, etc

mas info: linux/performance/cpu/tunables_power.md
