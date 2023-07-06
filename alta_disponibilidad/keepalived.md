http://www.keepalived.org
https://www.keepalived.org/doc/index.html
https://www.keepalived.org/manpage.html
https://github.com/acassen/keepalived
http://www.cyberciti.biz/faq/rhel-centos-fedora-keepalived-lvs-cluster-configuration/
https://docs.nginx.com/nginx/admin-guide/high-availability/ha-keepalived-nodes/

Keepalived is a routing software written in C. The main goal of this project is to provide simple and robust facilities for loadbalancing and high-availability to Linux system and Linux based infrastructures. Loadbalancing framework relies on well-known and widely used Linux Virtual Server (IPVS) kernel module providing Layer4 loadbalancing. Keepalived implements a set of checkers to dynamically and adaptively maintain and manage loadbalanced server pool according their health. On the other hand high-availability is achieved by VRRP protocol. VRRP is a fundamental brick for router failover. In addition, Keepalived implements a set of hooks to the VRRP finite state machine providing low-level and high-speed protocol interactions. Keepalived frameworks can be used independently or all together to provide resilient infrastructures.


Hace un funcionamiento parecido a Pacemaker+Corosync pero en un solo demonio, y bastante más básico.

Con ansible: http://everythingshouldbevirtual.com/ansible-keepalived


En la configuración, podemos poner los dos a MASTER y entre ellos eligirán cual se pone en modo BACKUP


adduser -s /sbin/nologin -M -r -d / keepalived_script

Ejemplo de config:
global_defs {
  script_security
  script_user keepalived_script # que user ejecutará los scripts de chequeo
  max_auto_priority 80 # por si hace falta el proceso de keepalived se suba la preferencia del scheduling en caso de saturación, hasta cuanto puede subir
}

vrrp_script chk_haproxy {
    script "/bin/pidof haproxy"
    interval 2
    weight 20 # cuantos puntos de prioridad sumará/perderá si el check funciona o no. Se puede invertir con "reverse"
    rise 2 # cuantos intentos buenos para considerar bueno el check
    fall 2 # cuantos intentos malos para considerar bueno el check
    # Los puntos de priority +- este cambio deben ser suficientes para que el segundo nodo se ponga como master
}

vrrp_instance nombre {
    state MASTER
    interface enp2s0
    virtual_router_id 40
    priority 110

    # No hace falta ponerla si es la misma definida arriba
    track_interface {
        enp2s0
    }
    # una o varias IPs
    virtual_ipaddress {
        10.0.2.55/24
    }
    # no es obligatorio
    track_script {
        chk_haproxy
    }
    # allows the lower priority machine to maintain the master role, even when a higher priority machine comes back online
    nopreempt
}


Si configuramos uno como MASTER y otro como BACKUP, la priority del MASTER deberá ser mayor.

Si configuramos los dos sin estado (por defecto es BACKUP) con la misma prioridad, el que tenga el track_script OK será el que tenga la VIP.
En caso de que los dos tengan script a OK (empate) gana uno de los dos.
Si uno sube de prioridad y empatan, se queda el que ya tenía la VIP.


# Multicast VS unicast
Unicast soportado desde la version 1.2.8
https://www.keepalived.org/changelog.html#:~:text=ability%20to%20use%20VRRP%20over%0A%20%20unicast

https://serverfault.com/a/1076854
I would not recommend using unicast because it makes the VRRP setup more brittle than it should be, each time you need to reconfigure the peer IP address you would need to update the configuration of other peers, possibly incurring downtime

In some environments, notably public clouds, multicast is unavailable. In this case, Keepalived can send VRRP packets using unicast
https://vincent.bernat.ch/en/blog/2020-keepalived-unicast-vxlan#:~:text=In%20some%20environments%2C%20notably%20public%20clouds%2C%20multicast%20is%20unavailable.%20In%20this%20case%2C%20Keepalived%20can%20send%20VRRP%20packets%20using%20unicast

En las clouds no se suele soportar multicast.
Ejemplo, GCP: https://cloud.google.com/vpc/docs/vpc#:~:text=VPC%20networks%20support%20IPv4%20and%20IPv6%20unicast%20addresses.%20VPC%20networks%20do%20not%20support%20broadcast%20or%20multicast%20addresses%20within%20the%20network.


# Configuraciones segun id/hostname
Podemos poner en la config secciones que solo serán interpretadas si el id (puesto con la opción "-i", o por defecto el hostname) matchea el "@xxx":
@main   router_id main_router
@backup router_id backup_router


# Notificacion por email de cambios
global_defs {
   notification_email {
     root@mydomain.com
   }
   notification_email_from svr2@mydomain.com
   smtp_server localhost
   smtp_connect_timeout 30
}


# Notify
Ejecutar acciones cuando cambia de estado
https://tobru.ch/keepalived-check-and-notify-scripts/

También se puede configurar keepalived para que notifique via FIFO y poner a un demonio a escuchar al otro lado.

Ejemplo de aplicación en go que recibe los eventos via FIFO y tiene su propio fichero de configuración para las tareas que debe ejecutar.
https://git.st8l.com/luxolus/kdnotify

Ejemplo en python, script para "notify", gestiona los distintos tipos de llamada:
https://gist.github.com/adrianlzt/818df9a12e82e8f5663f39c72015798b


# Monitoring
https://serverfault.com/questions/560024/view-current-state-of-keepalived
snmp
dbus
notify

kill -USR2 $(cat /var/run/keepalived.pid)
Vuelca estadísticas en /tmp/keepalived.stats

Parece que hay mas signals disponibles, una que vuelca las métricas en formato json, pero el build que tengo no lo soporta:
kill -s $(keepalived --signum=STOP) $(cat /run/keepalived.pid)


## snmp
https://keepalived.readthedocs.io/en/latest/snmp_support.html

keepalived has to be compiled with SNMP support (parece que es lo normal).
You need a running SNMP server with agentx enabled.
keepalived needs to successful connect to agentx (see logs).

Hace falta arrancar el keepalived con "-x".


# Authentication - NO USAR
Se pueden configurar dos tipos "PASS" y "AH", pero ambas fueron sacadas del protocolo, así que no se aconseja su uso (entiendo).

Note: Earlier version of the VRRP specification had several defined authentication types [RFC2338]. These were removed in this
specification because operational experience showed that they did not provide any real security and would only cause multiple masters to be created.
https://datatracker.ietf.org/doc/rfc3768/#:~:text=Note%3A%20%20Earlier%20version%20of%20the%20VRRP%20specification%20had%20several%20defined%0A%20%20%20authentication%20types%20%5BRFC2338%5D.%20%20These%20were%20removed%20in%20this%0A%20%20%20specification%20because%20operational%20experience%20showed%20that%20they%20did%20not%0A%20%20%20provide%20any%20real%20security%20and%20would%20only%20cause%20multiple%20masters%20to%20be%0A%20%20%20created.

En la RFC más reciente (https://datatracker.ietf.org/doc/rfc5798/) siguen especificando que no hay ningún tipo de seguridad (encriptación, passwords, etc).

https://datatracker.ietf.org/doc/rfc3768/#:~:text=Removed%20authentication%20methods%20from%20VRRP
   -  Removed authentication methods from VRRP.  Changes included:
      o  Removed the values for password and IPSEC based authentication.
         The fields and values are retained to keep backwards
         compatibility with RFC 2338.



# Debug
https://access.redhat.com/solutions/3220521
Arrancar en foreground en modo debug
keepalived -nldD



# Errores
daemon is already running
Mirar si hay un .pid en /var/run/keepalived



## Receive advertisement timeout
En una configuración con "peers", el nodo backup de vez en cuando muestra el mensaje:
"Receive advertisement timeout"
E inmediatamente después se pone como master.
Al enviar el mensaje de que es el nuevo master, el master original lo ve y envía de nuevo un mensaje avisando de que él es el master bueno.
Y el que acaba de pasar de backup a master, se vuelve a degradar a backup.
