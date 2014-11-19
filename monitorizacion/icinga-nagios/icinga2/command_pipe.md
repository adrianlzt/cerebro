http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/getting-started#setting-up-external-command-pipe

/var/run/icinga2/cmd/icinga2.cmd

ln -s /etc/icinga2/features-available/command.conf /etc/icinga2/features-enabled/

Habilitar apache para que pueda escribir en el socket de los comandos:
usermod -a -G icingacmd apache

service icinga2 restart
