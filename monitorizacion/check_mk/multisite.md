http://mathias-kettner.de/checkmk_multisite.html

Interfaz web para la monitorización.
Se comunica a través de livestatus.

La idea de esta interfaz es para usarse en monitorización distribuída. Multisite se conecta a distintos nagios con livestatus y obtiene los datos.


Si no usamos su setup.sh es un poco infierno la instalación.


Permite leer de varios livestatus de icingas disintos
Hace falta configurar livestatus para poder ser accedido desde el exterior.
Luego configurar multisite para poder leerlo.

Gestion de usuarios/contactos en caso de varios sites:
para poder tener acceso a la interfaz web tiene que dejarte pasar apache
una vez entras en apache
se mapea el usuario de htpasswd con un contacto del mismo nombre, en ambos icinga
si solo existe el contacto en un icinga, solo se verá el contenido de ese icinga
si el contacto existe en los dos, se verán ambas cosas


https://mathias-kettner.de/checkmk_livestatus.html#H1:Remote a

En la máquina con livestatus:
yum install xinetd

/etc/xinetd.d/livestatus
service livestatus
{
  type = UNLISTED
  port = 6557
  socket_type = stream
  protocol = tcp
  wait = no
  # limit to 100 connections per second. Disable 3 secs if above.
  cps = 100 3
  # set the number of maximum allowed parallel instances of unixcat.
  # Please make sure that this values is at least as high as
  # the number of threads defined with num_client_threads in
  # etc/mk-livestatus/nagios.cfg
  instances = 500
  # limit the maximum number of simultaneous connections from
  # one source IP address
  per_source = 250
  # Disable TCP delay, makes connection more responsive
  flags = NODELAY
  user = icinga
  server = /usr/bin/unixcat
  server_args = /var/spool/icinga/cmd/live
  # configure the IP address(es) of your Nagios server here:
  # only_from = 127.0.0.1 10.0.20.1 10.0.20.2
  disable = no
}

PROBLEMA, xinetd mantiene una conexión establecida con el socket unix del livestatus y no permite reiniciarse correctamente a icinga (el script de init.d termina matándolo con un kill -9)
Creo que esto era por activar la opción "Use persistent connections"

chkconfig xinetd on
service xinetd start

Testear:
nc 192.168.82.235 6557 <<< "GET services"

nc 10.26.236.179  6557 <<< "GET services
Columns: host_name host_state service_description
Limit: 2"


Configurar multisite:
https://mathias-kettner.de/checkmk_multisite_setup.html
Tamien en la interfaz gráfica, en "WATO - Configuration" -> "Distributed Monitoring"
Si está vacío usa el local.
Si queremos añadir un externo, primero meter el "local site" y luego el remoto.
Si solo metemos el remoto, no veremos el local.
El cambio se producirá automaticamente tras darle a guardar.

Si usamos pnp4nagios deberemos definir el "URL prefix" con la url de donde obtener el pnp4nagios.
Este pnp4nagios debe ser accesible directamente por los usuarios que están consultando multisite.
Debe ir con una barra al final:
Ej: http://el-otro.icinga.com/

Si vamos a usar el multisite (UI primaria) con https, deberemos configurar el "URL prefix" con https. Si no lo hacemo así, cuando intente cargar una gráfica del pnp4nagios nos dirá que no lo hace por que estamos metiendo contenido inseguro (http) en una web https.




Multisite lee el fichero multisite.mk y los que haya en multisite.d/
Esta conf se guarda en sites.mk


Ejemplo generado con wato:
sites = \
{
  'local': {
    'alias': u'icingadsn',
    'disabled': False,
    'insecure': False,
    'multisiteurl': '',
    'persist': False,
    'repl_priority': 0,
  },
  'cyclops': {
    'alias': u'Cyclops Server',
    'disabled': False,
    'insecure': False,
    'multisiteurl': '',
    'persist': False,
    'repl_priority': 0,
    'socket': 'tcp:10.9.2.35:6557',
    'timeout': 10,
    'url_prefix': 'http://10.9.2.35/'
  }
}


Uno sencillo:
sites = {
  "munich" : {
      "alias" : "Munich"
  },
  "paris": {
     "alias":          "Paris",
     "socket":         "tcp:10.0.0.2:6557",
     "url_prefix":     "http://10.0.0.2/",
   },
}

El url_prefix lo usará para poner luego pnp4nagios/xxx y coger las graficas desde el otro server.
Si el otro site (no local) no se puede acceder al livestatus remoto, la interfaz gráfica se queda pensando bastante rato hasta que al final nos muestra el site local y un error de acceso al otro site.

service apache2 restart



Si queremos que un contacto vea cosas en el interfaz local y en el remoto, el mismo contacto (mismo nombre) deberá existir en ambos icingas.


Para que el multisite que quiere ver todo pueda meter graficas de pnp del segundo nodo, hace falta en este segundo nodo, en el fichero de apache de configuración de pnp4nagios meter esta linea:
Header set Access-Control-Allow-Origin "*"
