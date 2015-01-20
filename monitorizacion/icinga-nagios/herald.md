https://github.com/etsy/nagios-herald
http://ryanfrantz.com/posts/introducing-nagios-herald/
http://ryanfrantz.com/posts/introducing-nagios-herald/posts/alert-design/

PROBLEMAS:
 - Necesita que activemos la exportacion de las macros como variables de entorno. Esto puede afectar a la performance.
 - Hace falta modificar los checks para que envíen más información, luego se trata en un script en ruby para devolver la información.
 - Ruby 1.9.x, problematico con CentOS 6.4/5

Programa avanzado para enviar emails.
Nos permite de una forma sencilla adjuntar más información sobre la alarma.
Por ejemplo, ante una alarma de CPU, adjuntar un 'top | head -5', para que la persona que reciba el email tenga más información y pueda decidir si debe realizar alguna acción.

# Instalacion
git clone git@github.com:etsy/nagios-herald.git
cd nagios-herald/

## CentOS
Hace falta 1.9.2 o 1.9.3
Usar rvm


Instalar gemas necesarias:
gem install app_conf choice mail

Quitar ganglia_graph porque necesita una gema de chef
nagios-herald/lib/nagios-herald/helpers.rb
Comentar:
require 'nagios-herald/helpers/ganglia_graph'

Comentar tambien el de logstash (requiere gema elasticsearch)

# Configuración

# icinga.cfg
enable_environment_macros=1 # mayor consumo memoria y cpu

Cambiar los commands para que usen herald.
https://github.com/etsy/nagios-herald/blob/master/docs/nagios-config.md

# email
define command {
    command_name    notify-host-by-email
    command_line    /usr/local/nagios-herald/bin/nagios-herald --message-type email --formatter=$_HOSTMESSAGE_FORMATTER_NAME$ --nagios-cgi-url=http://nagios.example.com/nagios/cgi-bin/cmd.cgi --reply-to=nagios@example.com
}

# specify the location of custom formatters
define command {
    command_name    notify-service-by-email
    command_line    /usr/local/nagios-herald/bin/nagios-herald --message-type email --formatter=$_SERVICEMESSAGE_FORMATTER_NAME$ --nagios-cgi-url=http://nagios.example.com/nagios/cgi-bin/cmd.cgi --reply-to=nagios@example.com --formatter-dir=/usr/local/nagios-herald-formatters
}

Las variables $_HOSTMESSAGE_FORMATTER_NAME$ y $_SERVICEMESSAGE_FORMATTER_NAME$ son custom macros de los hosts o services. Si no se define, se usa un formateador por defecto. De esta manera enlazamos cada service con que tipo de email debe generarse.
Ejemplo:
define service {
    hostgroup_name                  web_servers
    service_description             Disk Space
    notification_interval           20
    check_command                   check_nrpe!check_disk
    _message_formatter_name         check_disk            # custom variable
    contact_groups                  ops
}


## Configuración de Herald
nagios-herald/etc/config.yml:

logfile: /tmp/nagios-herald.log
formatter_dir: /opt/nagios-herald/lib/nagios-herald/formatters
icinga: true


Aqui se definirán los endpoints de distintos servidores para poder obtener valores (por ejemplo: ganglia, graphite, splunk, logstash...). Estas variables luego las podremos usar en los formateadores para obtener valores.

Para usar icinga en vez de nagios:
icinga: true


# Helpers
https://github.com/etsy/nagios-herald/blob/master/docs/helpers.md
Funciones para obtener información de otras herramientas

GangliaGraph - Downloads relevant graphs to be embedded in (email) messages.
SplunkReporter - Queries Splunk for information to add to an alert.
LogstashQuery - Queries logstash with either a kibaba-style query or a file containing query JSON
UrlImage - Generic helper to download images.

Para sacar la información de los 5 procesos que más se consumen lo que se hace es que el plugin envie esta informacion como longoutput.


# Debug
https://github.com/etsy/nagios-herald/blob/master/docs/formatters.md

Ejecutar a mano con --trace y -d
Mirar el fichero de log (definido en el config.yml)

Usando con rvm:
GEM_HOME=/usr/local/rvm/gems/ruby-1.9.3-p551 GEM_PATH=/usr/local/rvm/gems/ruby-1.9.3-p551:/usr/local/rvm/gems/ruby-1.9.3-p551@global /opt/nagios-herald/bin/nagios-herald --message-type email --formatter=check_cpu --nagios-cgi-url=http://192.168.51.3/icinga/cgi-bin/cmd.cgi --reply-to=aaa@bbb.com -r aaa@zzz.com --formatter-dir=/opt/nagios-herald/lib/nagios-herald/formatters --notification-type PROBLEM -e vars --trace -d --no-send
