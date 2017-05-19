https://kb.isc.org/article/AA-00640/0/Should-I-use-rndc-reconfig-or-rndc-reload-when-changing-my-nameserver-configuration-files.html

Si cambiamos el named.conf, para recargar la config:
rndc reconfig


Si cambiamos alguna zona (RECORDAR aumentar el SOA):
rndc reload

O solo hacer reload de una zona
rndc reload NOMBRE_ZONA
