https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Proxies_and_Jump_Hosts#Passing_Through_One_or_More_Gateways_Using_ProxyJump
A partir de openSSH 7.3 existe una opción para especificar a traves de que servidor queremos saltar:
ssh -J user1@jumphost1.example.org:22 fred@192.168.5.38

Lo malo del -J es que no podemos pasar una clave específica al jump host. Con ProxyCommand si podemos.

Host server2
        HostName 192.168.5.38
        ProxyJump user1@jumphost1.example.org:22
        User fred

Incluso podemos poner varios servidores en el ProxyJump que serán visitados en orden:
        ProxyJump user1@jumphost1.example.org:22,user2@jumphost2.example.org:2222


Si queremos usar la clave privada del host intermedio para acceder al nodo deseado (A->B->C):
Host C
    ProxyCommand ssh -o 'ForwardAgent yes' B 'ssh-add && nc %h %p'

-W parece la cara de la otra manera de -J



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



# Inline
ssh -o "VerifyHostKeyDNS=no" -o ProxyCommand="ssh -A -o BatchMode=yes -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -W %h:%p cloud-user@10.95.83.146" cloud-user@172.16.1.22
