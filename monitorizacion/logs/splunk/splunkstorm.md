https://www.splunkstorm.com

Servidor en la nube donde enviar nuestros logs para analizarlos.
No necesitamos tener nada instalado.
20GB gratis
30 días de retención de datos.

Lo pruebo con una máquina de AWS.
Hay que bajarse el splunkforwarder para mi CentOS (rpm) e instarlo.
rpm -i splunkforwarder-6.0-182037-linux-2.6-x86_64.rpm

Arrancamos splunk e instalamos las credenciales:
/opt/splunkforwarder/bin/splunk start
iptables -F
https://ec2-54-242-103-114.compute-1.amazonaws.com:8089/
Web básica sin mucha info
Con virtualbox no tengo acceso a la web :?

Si quiero cambiar la pass de admin, por defecto 'changeme'
./splunk login -auth admin:changeme
./splunk edit user admin -password foo

/opt/splunk/bin/splunk install app <path>/stormforwarder_<project_id>.spl -auth admin:foo
App '/root/stormforwarder_83030b10310711e3961a123139254938.spl' installed 

Ficheros monitorizados:
./splunk list monitor

Agregar ficheros a monitorizar mediante la CLI (le podemos definir el source type que queramos)
./splunk add monitor /var/log/messages -sourcetype messages

Tambien se pueden configurar los inputs en un fichero:
/opt/splunk/etc/apps/search/local/inputs.conf

Restart para que los cambios tengan efecto
./splunk restart

En splunk storm ya podremos ver el forwarder registrado y el último envío de información.

