https://collectd.org/wiki/index.php/Notifications_and_thresholds
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#threshold_configuration

Que collectd nos avise cuando una métrica supere (decrezca) de cierto umbral.

Las notificaciones se pueden "empujar" a collectd, y también collectd las "empuja" a los output plugins.

CUIDADO!
Por defecto no están definidos Persist ni PersistOK, por lo tanto las notificaciones solo se generan cuando se cambia de un estado OK a no-OK o viceversa.
Si envíamos una notificación antes de que nagios haya configurado el service esta alarma se perderá.

Si configuramos los Persist y PersistOK se enviará una notificación por cada vez que se recolecten los datos. Puede que saturemos al servidor.

Una solución es activar el Persist con un timeout alto, para que los eventos no-OK sigan enviando notificaciones (pero una cada minuto o más)


El principal generador de notificaciones será el plugin Thresholds.
  Notifica por valores fuera de un rango definido.
  También notifica por falta de valores
    Se define en las opciones globales el parámetro 'Timeout' (default 2), que será el número de intervalos que se esperará antes de notificar (el tiempo de intervalo será el particular de cada plugin)
  Genera dos tipos de notificaciones: FAILURE o WARNING


Notificaciones persistentes: una por cada evento (una por cada interval si el valor no cambia)
No persistentes, una por cada cambio de estado.


## Configuración ##
Esquema de relación entre los datos que tenemos que poner en el threshold con la cadena que se envia a graphite.
HOST.Plugin-Instance.Type-Instance.DataSource

Podemos ver si una métrica tiene varios Data Source mirando en /usr/share/collectd/types.db
Por ejemplo: 
HOST.processes-NOMBRE.ps_count.processes
HOST.processes-NOMBRE.ps_count.threads


Primeramente definimos de donde obtendremos el valor con los bloques 'Host', 'Plugin' y/o 'Type'.
Estos bloques se pueden anidar. Ejemplo:
  <Host "hostname">
    <Plugin ..>
      <Type ...

Esta métrica:
*.df-root.df_complex-used
Hará match con este threshold
<Plugin "threshold">
  <Plugin "df">
    Instance "root"
    <Type "df_complex">
        Instance "used"
        FailureMax 6025360000
        FailureMin 6025350000
        Percentage false
    </Type>
  </Plugin>
</Plugin>

Esta métrica:
*.disk-sda5.disk_merged.read
Hará match con este threshold
<Plugin "threshold">
  <Plugin "disk">
    Instance "sda5"
    <Type "disk_merged">
      DataSource "read"
      FailureMax 100
      FailureMin 90
    </Type>
  </Plugin>
</Plugin>

Esta métrica:
*.disk_octets.*
Hará match con este threshold
<Plugin "threshold">
 <Type "disk_octets">
   FailureMax 100
   FailureMin 90
 </Type>
</Plugin>

Esta métrica
*.otro_client1.com.*.disk_octets.read
Hará match con este threshold
<Plugin "threshold">
  <Host "otro_client1.com">
    <Type "disk_octets">
      DataSource "read"
      FailureMax 100
      FailureMin 99
    </Type>
  </Host>
</Plugin>


Esta métrica:
*.cpu-1.cpu-idle
Hará match con este threshold
<Plugin "threshold">
  <Plugin "cpu">
    Instance "1"
    <Type "cpu">
      Instance "idle"
      FailureMax 95
      FailureMin 90
    </Type>
  </Plugin>
</Plugin>

Podemos únicamente definir el type y hará match contra todas las instancias del plugin cpu
<Plugin "threshold">
  <Type "cpu">
    Instance "idle"
    FailureMin 10
  </Type> 
</Plugin>

Podríamos poner por encima de Plugin o de Type un elemento "Host" para solo hacer match en ese host (para el caso de que esté recibiendo métricas de varios hosts)


Ejemplo para users:
<Plugin "threshold">
  <Type "users">
    FailureMax 5
    FailureMin 4
  </Type>
</Plugin>

Instance es para seleccionar una métrica en particular de un plugin.

FailureMax Value
WarningMax Value
  Si el valor supera lo defindo aquí se genera una alarma del tipo correspondiente.

FailureMin Value
WarningMin Value
  Lo mismo si el valor decrece por debajo de value


Invert true|false
If set to true the range of acceptable values is inverted, i. e. values between FailureMin and FailureMax (WarningMin and WarningMax) are not okay. Defaults to false.

Hits Number
  Salta la alarma si se supera el threshold un número de veces. El contador se reinicia cuando se genera notificación o el valor vuelve al rango aceptable

Hysteresis Number
  Para valores que "flapean" cerca del threshold. Si el threshold es 100 y la histéresis 1, se generará Warning cuando pase de 101, y OK cuando decrezca de 99

Percentage
  Algunos plugins permiten sacar también los valores en porcentaje (df).

Interesting true|false
  If set to true (the default), the threshold must be treated as interesting and, when a number of Timeout values will lost, then a missing notification will be dispatched. On the other hand, if set to false, the missing notification will never dispatched for this threshold.


## Envio de notificaciones ##

Las posibilidades son: https://collectd.org/wiki/index.php/Category:Callback_notification
  logfile, las notificaciones se escriben en el fichero de log (si está configurado) como nivel "info". No hace falta configurar nada más.
  NotificationExec, el programa ejecutar recibe por stdin datos de la alarma http://collectd.org/documentation/manpages/collectd-exec.5.shtml#notification_data_format
  notify_desktop, poner un aviso en el escritorio
  notify_email
  syslog, mediante el parámetro "NotifyLevel OKAY|WARNING|FAILURE" decidimos que notificaciones se envian (OKAY envia todas, WARNING también envía FAILURE)


Severidades:
  FAILURE
  WARNING
  OKAY


Ejemplo tonto de NotificationExec:
notificador.conf
  LoadPlugin exec
  <Plugin exec>
    NotificationExec "vagrant" "/home/vagrant/notificador.sh"
  </Plugin>

notificador.sh
#!/bin/dash
cat - >> /home/vagrant/LOG-notificador

Ejemplo de salida (recordar que /home/vagrant/LOG-notificador debe tener permisos de escritura por el usuario vagrant)
  Severity: OKAY
  Time: 1391977347.607
  Host: cliente
  Plugin: load
  Type: load
  DataSource: shortterm
  CurrentValue: 1.000000e+00
  WarningMin: nan
  WarningMax: nan
  FailureMin: nan
  FailureMax: 1.000000e+00

  Host cliente, plugin load type load: All data sources are within range again.
