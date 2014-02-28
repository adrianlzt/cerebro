https://collectd.org/wiki/index.php/Notifications_and_thresholds
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#threshold_configuration

Que collectd nos avise cuando una métrica supere (decrezca) de cierto umbral.

Las notificaciones se pueden "empujar" a collectd, y también collectd las "empuja" a los output plugins.


El principal generador de notificaciones será el plugin Thresholds.
  Notifica por valores fuera de un rango definido.
  También notifica por falta de valores
    Se define en las opciones globales el parámetro 'Timeout' (default 2), que será el número de intervalos que se esperará antes de notificar (el tiempo de intervalo será el particular de cada plugin)
  Genera dos tipos de notificaciones: FAILURE o WARNING


Notificaciones persistentes: una por cada evento (una por cada interval si el valor no cambia)
No persistentes, una por cada cambio de estado.


## Configuración ##
Primeramente definimos de donde obtendremos el valor con los bloques 'Host', 'Plugin' y/o 'Type'.
Estos bloques se pueden anidar. Ejemplo:
  <Host "hostname">
     <Type "cpu">
       Instance "idle"
       FailureMin 10
     </Type> 
     ...

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

Percentage?? para que?


## Envio de notificaciones ##

Las posibilidades son: https://collectd.org/wiki/index.php/Category:Callback_notification
  logfile, las notificaciones se escriben en el fichero de log (si está configurado) como nivel "info"
  NotificationExec, el programa ejecutar recibe por stdin datos de la alarma http://collectd.org/documentation/manpages/collectd-exec.5.shtml#notification_data_format
  notify_desktop, poner un aviso en el escritorio
  notify_email
  syslog, mediante el parámetro "NotifyLevel OKAY|WARNING|FAILURE" decidimos que notificaciones se envian (OKAY envia todas, WARNING también envía FAILURE)


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
