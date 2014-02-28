http://www.cyberciti.biz/faq/tcp-wrappers-hosts-allow-deny-tutorial/

Es una especie de firewall a nivel de aplicación.
Es necesario que la app lo soporte:
  ldd /path/to/daemon | grep libwrap.so

Podemos hacer:
  -logueo
  -access control (ejecutar scripts en tal caso)
  -host name verification
  -spoofing protection
 
En /etc/hosts.allow y /etc/hosts.deny determinaremos quien puede, o no, acceder a cada demonio.
Formato: daemon_list : client_list [ : shell_command ]
