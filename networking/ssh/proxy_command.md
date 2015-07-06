http://undeadly.org/cgi?action=article&sid=20070925181947
http://sshmenu.sourceforge.net/articles/transparent-mulithop.html

~/.ssh/config file:

Host internal.hostname.tld internal
  User          merdely
  HostName      internal.hostname.tld
  #Port		23452
  ProxyCommand  ssh -W %h:%p merdely@gateway.hostname.tld

Para conectar a internal o a internal.hostname.tld, uso el nodo intermedio gateway.hostname.tld
En dicho nodo pasarela arranco el netcat conectando al host final con el puerto que le pase (lo pone por defecto a 22)
Si definimos el HostName, será el nombre de máquina que se use en gateway.hostname.tld para conectar a internal


Para hacer dos saltos. Salta a host1.com con el usuario local, desde ahí a host2 con 'user', y de ahí a "perdido.com" con 'pepe'
Host rebuscao
  Hostname perdido.com
  User pepe
  ProxyCommand ssh -A -X host1.com ssh -A -X user@host2.org nc %h %
  # Como hacer con -W?





Host *+*
  StrictHostKeyChecking no
  ProxyCommand ssh -q $(echo %h | sed 's/+[^+]*$//;s/\([^+%%]*\)%%\([^+]*\)$/\2 -l \1/;s/:/ -p /') nc $(echo %h | sed 's/^.*+//;/:/!s/$/ %p/;s/:/ /')

Con esto puedes hacer
ssh alice+bob
Y te conectaras a bob a través de alice

