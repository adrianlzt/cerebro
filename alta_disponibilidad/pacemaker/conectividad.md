http://linux.die.net/man/5/cman
http://linux.die.net/man/5/corosync.conf

Si un nodo se queda sin conectividad con los otros, intentará cada rrp_problem_count_timeout segundos durante rrp_problem_count_threshold veces.
Aunque con cman, con la conf por defecto he visto 30 veces cada 2"

Apr 01 17:10:17 [8157] ESJC-DSMM-MS010S       crmd:  warning: do_cib_control:   Couldn't complete CIB registration 28 times... pause and retry
Apr 01 17:10:19 [8157] ESJC-DSMM-MS010S       crmd:     info: crm_timer_popped:         Wait Timer (I_NULL) just popped (2000ms)
Apr 01 17:10:23 [8157] ESJC-DSMM-MS010S       crmd:    error: do_cib_control:   Could not complete CIB registration  30 times... hard error



Probar como si el nodo hubiese perdido conectividad:
iptables -A INPUT -i eth0 -p udp --dport 5405 -j DROP
