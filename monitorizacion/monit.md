http://mmonit.com/monit/

Corre un demonio en cada máquina monitorizada.

Monit is an open source utility for managing and monitoring, processes, programs, files, directories and filesystems on a UNIX system. Monit conducts automatic maintenance and repair and can execute meaningful causal actions in error situations.

In difference to many monitoring systems, Monit can act if an error situation should occur, e.g.; if sendmail is not running, Monit can start sendmail again automatically or if apache is using too much resources (e.g. if a DoS attack is in progress) Monit can stop or restart apache and send you an alert message. Monit can also monitor process characteristics, such as; how much memory or cpu cycles a process is using.


No he encontrado cuanto consume, pero según su README parece que poco
https://bitbucket.org/tildeslash/monit/src/master/
Memory and Disk space. A minimum of 1 megabytes RAM are required and around 500KB of free disk space. You may need more RAM depending on how many services Monit should monitor.


Ejemplos de config
https://help.clouding.io/hc/es/articles/360010216759-Monitorizar-mi-servidor-Centos-con-Monit
https://mmonit.com/wiki/Monit/ConfigurationExamples


## Config mínima
Con esto monitoriza cpu, load, mem, swap, uptime, file descriptors.

```
set daemon  30              # check services at 30 seconds intervals
set log syslog
set httpd port 2812 and
    allow admin:monit
```

## Check host remoto
```
check host myserver with address 192.168.1.1
  if failed ping then alert
  if failed port 3306 protocol mysql with timeout 15 seconds then alert
  if failed port 80 protocol http
     and request /some/path with content = "a string"
  then alert
```

Con notificación vía script cada x ciclos y evitando notificar al primer fallo:
```
check host koreapi with address 192.168.0.182
  if failed port 8123 protocol http
     and request / with content = "<title>Home Assistant</title>"
     for 3 times within 5 cycles
  then exec "/home/opc/pushbullet.py --token REDACTED"
      repeat every 5 cycles
  else exec "/home/opc/pushbullet.py --token REDACTED"
```

## Notificaciones
Por defecto notifica por email.

Si queremos otro tipo de monit podemos hacer:
... if status != 0 then exec /path/to/script.sh

Script para pushbullet
https://gist.github.com/1a0a7c92fb0cb17455307908f5632fe3


# Install
Algunas distros traen empaquetado.
Si no, bajar el .tgz para la arquitectura que necesitemos.

En una oracle linux también he tenido que instalar libnsl.x86_64


# Ejecutar
Systemd unit
https://mmonit.com/wiki/Monit/Systemd
