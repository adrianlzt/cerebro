http://www.keepalived.org
https://www.keepalived.org/doc/index.html
https://www.keepalived.org/manpage.html
https://github.com/acassen/keepalived
http://www.cyberciti.biz/faq/rhel-centos-fedora-keepalived-lvs-cluster-configuration/

Keepalived is a routing software written in C. The main goal of this project is to provide simple and robust facilities for loadbalancing and high-availability to Linux system and Linux based infrastructures. Loadbalancing framework relies on well-known and widely used Linux Virtual Server (IPVS) kernel module providing Layer4 loadbalancing. Keepalived implements a set of checkers to dynamically and adaptively maintain and manage loadbalanced server pool according their health. On the other hand high-availability is achieved by VRRP protocol. VRRP is a fundamental brick for router failover. In addition, Keepalived implements a set of hooks to the VRRP finite state machine providing low-level and high-speed protocol interactions. Keepalived frameworks can be used independently or all together to provide resilient infrastructures.


Parche para unicast: http://1wt.eu/keepalived/

Hace un funcionamiento parecido a Pacemaker+Corosync pero en un solo demonio, y bastante más básico.

Soportado completamente en CentOS 6.6


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
    # allows the lower priority # machine to maintain the master role, even when a higher priority machine comes back online
    nopreempt
}


Si configuramos uno como MASTER y otro como BACKUP, la priority del MASTER deberá ser mayor.

Si configuramos los dos sin estado (por defecto es BACKUP) con la misma prioridad, el que tenga el track_script OK será el que tenga la VIP.
En caso de que los dos tengan script a OK (empate) gana uno de los dos.
Si uno sube de prioridad y empatan, se queda el que ya tenía la VIP.


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


# Monitoring
https://serverfault.com/questions/560024/view-current-state-of-keepalived
snmp
dbus
notify



# Auth - NO USAR
Note: authentication was removed from the VRRPv2 specification by RFC3768 in 2004.
Use of this option is non-compliant and can cause problems


# Errores
daemon is already running
Mirar si hay un .pid en /var/run/keepalived
