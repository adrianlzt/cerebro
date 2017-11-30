Escaner de seguridad

Imagen opensource:
https://dlcdn.alienvault.com/AlienVault_OSSIM_64bits.iso

USM es la versión de pago de OSSIM.


La iso no instala bien, se queda colgada en "Configuring suricata"
workaround aqui: https://www.alienvault.com/forums/discussion/15697/hyper-v-install-hanging-configuring-suricata

Se queda colgado porque dpkg requiere acción del usuario.
El truco es enviar al stdin del dpkg el comando "N" para que siga.
Es necesario enviar el "N" varias veces y tal vez a distintos dpkgs.

echo N > /proc/$(pidof dpkg)/fd/0


Una vez arranque podemos entrar en la shell con root:root
En el .bashrc hay un programa para arrancar un gestor grafico
Podemos usar la opción "JailBreak" para salir a la consola.

Iptables esta configurado solo permitiendo ciertas cosas.

ossim-reconfig
  reinicia todos los servicios que tiene la imagen


Para conseguir arrancar la imagen sin muchos problemas lo que hice fue dejar en el rc2.d solo los servicios del sistema y luego correr el ossim-config para que metiese los basicos de alienvault.

Interfaces de red:
 - la primera interfaz será la interfaz web
 - el resto de interfaces se podrán usar para escanear la red o recolectar logs
 - por defecto ossim pone ip fija a la primera interfaz. Modificar en /etc/network/interfaces y poner varias lineas para configurar las interfaces que aparezcan con dhcp

Esta pensando para usar una IP fija. Usar DHCP puede traer problemas: https://www.alienvault.com/forums/discussion/14309/can-the-ossim-installer-use-dhcp
En caso de que haya cambiado la ip deberemos modificar multitud de ficheros donde esta fijada la ip
grep -lwr 10.0.2.67 /etc | xargs -n1 sed -i "s/10.0.2.67/10.0.0.11/g"
  siendo la .2.67 la antigua y la .0.11 la nueva
grep -lwr 10.0.2.2 /etc | xargs -n1 sed -i "s/10.0.2.2/8.8.4.4/g"
  cambio de server de dns
Luego revisar
/etc/alienvault/network/interfaces.conf
/etc/networks
/etc/ossim/ossim_setup.conf
/etc/resolvconf/resolv.conf.d/original
/etc/ansible/hosts

En la web, Configuration -> Administration -> Min -> Vulnerability Scanner -> Scanner host

en la mysql, database alienvault:
update config set value="10.0.0.11" where conf="frameworkd_address";

mysql.user
update user set Host="10.0.0.11" where Host="10.0.2.67";

tabla alienvault
UPDATE system set admin_ip=INET6_ATON("10.0.0.11");
UPDATE server set ip=INET6_ATON("10.0.0.11");


Una vez arrancado accederemos a su interfaz web por https.

# Wizard
La primera vez tendremos que crear la cuenta de admin y nos llevará por un wizard para realizar la configuración.
A veces el wizard falla con un "API error - Operation cannot be completed". Parece que es porque tardan en arrancar algunos componentes (~5' o incluso algo más)
Creo que es el redis que tarda en levantar.

No entiendo como elige que interfaces mostrar en el wizard, pero teniendo tres interfaces la tercera no la mostraba.

En el siguiente paso nos pedirá una lista de "assets" (cosas que escanear). Se la podemos pasar como un csv, manualmente o pedirle que escanee la red.
Si le mandamos escanear la red por defecto escaneará las subredes donde tenga interfaces. Si queremos escanear más redes tendremos que pasarle un csv con las redes.

Una vez tenemos los assets nos ofrecerá meter el agente HIDS (https://www.alienvault.com/solutions/host-intrusion-detection-system)
file integrity monitoring, rootkit detection and to collect event logs.

Tambien quiere intentar recuperar los logs de los elementos de red.

Por último nos dice si queremos unirnos a OTX. Comunidad donde la gente sube firmas de ataques para que OSSIM los pueda reconocer.


# Config
/etc/alienvault

# Logs
/var/log/apache2/
  intefaz web

apps que corren en apache/php:
/var/log/alienvault

# Uso
Para hacer un scan desde la web:
/ossim/#environment/assets/assets
Add assets -> Scan for new assets

El escaneo lo hace lanzando un ansible contra el "sensor" (o el server) que tiene un modulo custom para nmap.
El resultado del scan lo almacena en /tmp/ID.scan



# Internals
La instalación principal parece que se encuentra en /usr/share/ossim

El wizard esta en /usr/share/ossim/www/wizard

El código web está en /usr/share/ossim/www o en las fuentes en alienvault-ossim/www

Modulos de ansible que utiliza: /usr/share/python/alienvault-api-core/share/ansible

El core de la api de alienvault esta escrito en python. Codigo en /usr/share/python/alienvault-api-core/lib/python2.7/site-packages/alienvault-api-core

El core usa su propio python: /usr/share/python/alienvault-api-core/bin/python
/usr/share/python/alienvault-api-core/bin/pip para ver los packages instalados
Wsgi de arranque de la app: /usr/share/python/alienvault-api/wwwroot/api.wsgi

## Celery
Parece que el frontend y el backend se comunican via cola de mensaje Celery.
Hace uso de redis (para scheduling?) y de rabbit (amqp)

## Scan
/usr/share/python/alienvault-api-core/lib/python2.7/site-packages/alienvault-api-core/ansiblemethods/sensor/nmap.py

El escaneo de redes lo lleva el fichero /usr/share/ossim/www/wizard/ajax/scan_ajax.php
La función principal parece que es:
            $obj = new Av_scan($nets, 'local', $scan_options);

Tiene pinta de que eso genera estra traza en el log de api_access:
127.0.0.1 - - [29/Nov/2017:11:38:51 +0100] "GET /av/api/1.0/nmap/e6c70e2f-e297-412a-8a7d-7c437e4d89e2/status HTTP/1.1" 404 3099 "-" "AlienvaultClient"

Y esta traza tiene mucha pinta de ser la culpable de que no funcione el escaner de red:
Nov 29 17:33:53 alienvault celeryd.py: ALIENVAULT-API[ERROR]: [ansible_run_nmap_scan] Error: Something wrong happened while running ansible command {'dark': {'10.0.2.67': {'msg': 'SSH encountered an unknown error during the connection. We recommend you re-run the command using -vvvv, which will enable SSH debugging output to help diagnose the issue', 'failed': True}}, 'contacted': {}}

Usa un task de ansible para lanzar nmap
Lanzar el scan desde python
ansible 192.168.5.84 -s -m av_nmap -a "target=192.168.5.84 scan_type=ping rdns=off job_id=26d6ca8e-db76-490e-8896-831d6307a3f2"

echo "127.0.0.1" > /tmp/inv
cd /usr/share/python/alienvault-api-core/share/ansible
../../bin/ansible all -i /tmp/inv -s -m av_nmap -a "target=172.16.10.0/24 scan_type=ping rdns=off job_id=local_ansioble"

Usando el modulo de python
/usr/share/python/alienvault-api-core/bin/python2
import ansiblemethods.sensor.nmap
ansiblemethods.sensor.nmap.ansible_run_nmap_scan("10.0.0.11", "172.16.10.0/24", "fast", False, "T3", False, False, 5678)
Generara unos ficheros: 5678.scan 5678.scan.pid 5678.targets

A ese metodo lo llama otro metodo: apimethod_run_nmap_scan
Que a su vez lo llama la funcion run_nmap_scan de celerymethods/jobs/nmap.py



El agent parece que es quien gestiona el network scan
Hay errores de conex


Problemas en ./api/api.log
Nov 29 11:20:38 alienvault celeryd.py: ALIENVAULT-API[WARNING]: File '/etc/alienvault/api/custom_tasks.yml' doesn't exists
Nov 29 11:31:05 alienvault celeryd.py: ALIENVAULT-API[ERROR]: [ansible_get_sensor_plugins] {'dark': {'10.0.2.67': {'msg': 'SSH encountered an unknown error during the connection. We recommend you re-run the command using -vvvv, which will enable SSH debugging output to help diagnose the issue', 'failed': True}}, 'contacted': {}}


Errores en ui.log
[Wed Nov 29 10:06:18 2017] [USER ERROR] [10.0.0.11] Scan could not be completed. The following errors occurred:<div style='padding-left: 10px;'></div> called in /ossim/wizard/ajax/scan_ajax.php and defined in /usr/share/ossim/www/wizard/ajax/scan_ajax.php on line 183 (get_status)
[Wed Nov 29 10:23:13 2017] [USER ERROR] [10.0.0.11] The following error occurred:<div style='padding-left: 10px;'>Task id not found</div> called in /ossim/wizard/ajax/scan_ajax.php and defined in /usr/share/ossim/include/classes/av_scan.inc on line 482 (_get_job_status)

cd /var/log/alienvault
tail -f ./agent/agent.log ./agent/agent_error.log ./api/api_access.log ./api/api.log
