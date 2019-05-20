http://www.keepalived.org
https://www.keepalived.org/manpage.html
https://github.com/acassen/keepalived
http://www.cyberciti.biz/faq/rhel-centos-fedora-keepalived-lvs-cluster-configuration/

Keepalived is a routing software written in C. The main goal of this project is to provide simple and robust facilities for loadbalancing and high-availability to Linux system and Linux based infrastructures. Loadbalancing framework relies on well-known and widely used Linux Virtual Server (IPVS) kernel module providing Layer4 loadbalancing. Keepalived implements a set of checkers to dynamically and adaptively maintain and manage loadbalanced server pool according their health. On the other hand high-availability is achieved by VRRP protocol. VRRP is a fundamental brick for router failover. In addition, Keepalived implements a set of hooks to the VRRP finite state machine providing low-level and high-speed protocol interactions. Keepalived frameworks can be used independently or all together to provide resilient infrastructures.


Parche para unicast: http://1wt.eu/keepalived/

Hace un funcionamiento parecido a Pacemaker+Corosync pero en un solo demonio, y bastante más básico.

Soportado completamente en CentOS 6.6


Con ansible: http://everythingshouldbevirtual.com/ansible-keepalived



En la configuración, podemos poner los dos a MASTER y entre ellos eligirán cual se pone en modo BACKUP


Ejemplo de config:
vrrp_script chk_haproxy {
    script "/bin/pidof haproxy"
    interval 2
    weight 2
    rise 2
    fall 2
}

vrrp_instance VI_1 {
    state MASTER
    interface enp2s0
    virtual_router_id 40
    priority 110
    track_interface {
        enp2s0
    }
    virtual_ipaddress {
        10.0.2.55/24
    }
    track_script {
        chk_haproxy
    }
    nopreempt
}
