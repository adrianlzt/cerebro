http://www.tecmint.com/how-to-monitor-user-activity-with-psacct-or-acct-tools/

Herramientas para controlar el uso de un servidor por parte de usuarios y procesos.

# Instalacion
yum install psacct
apt-get install accto

Arch, esta en los archived de aur: https://github.com/aur-archive/acct


# Activar
/etc/init.d/psacct start


# Comandos

## ac
ac
  tiempo total de conexión en horas

ac -d
  por dias

ac -p
  por usuarios

ac usuario

ac -d usuario
  usuario por dia


## sa
commands executed
primera columna, número de veces que se ha ejecutado el comando
XXre tiempo real usado, en minutos de reloj
XXcp suma de tiempo de sys + user en minutos
XXXXk cpu-time averaged core usage
comando


Probando algunos sleeps no parece funcionar exactamente asi:
python -c "import time; time.sleep(5)"
Eso dos veces devuelve:
2       0.17re       0.00cp    29280k   python



