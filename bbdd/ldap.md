# Conceptos
CN = Common Name
OU = Organizational Unit
DC = Domain Component
DN = el "path" completo del objeto

La idea es un servidor donde se almacenan datos de usuarios: nombre, email, uid, etc

Cuando alguien quiere loguearse en nuestro sistema, si lo tenemos integrado con ldap, pasaremos el user y pass a ldap para ver si existe.

LDAP se estructura como un arbol de directorios.

Lo más "alto" será la base que habrá definido nuestra organización. Para esto parece que se suelen usar los DC (uno o varios)
Por ejemplo: dc=grafana,dc=org

Por debajo de esta base tendremos otros "directorios", por ejemplo uno para usuarios: ou=users,dc=grafana,dc=org
Otro podría ser de grupos: ou=groups,dc=grafana,dc=org

Dentro de usuarios tendremos, por ejemplo, usuarios con dn estilo: uid=AAA,ou=groups,dc=grafana,dc=org
Dentro de cada usuario tendremos otro montón de parámetros como nombre, apellidos, direccion, etc

## Consultas

### Anónimas
ldapsearch -h SERVERLDAP -x -b BASE FILTER

Preguntamos al servidor ldap de forma anónima.
Se hace un bind pero sin login.

### Con bind (logueadas)
ldapsearch -h SERVERLDAP -D uid=USUARIO,ou=users,dc=grafana,dc=org -w PASSWORD -b BASE

Primero hacemos un bind al servidor con nuestro usuario (definiendo el DN entero) y la password.
Una vez unidos podremos hacer la consulta.


Por defecto ldapsearch nos da todas las entradas por debajo de la base.
Si queremos restringir para no "bajar" de un nivel usaremos:
-s one



# Instalación
## Arch
cliente y server consola:
sudo pacman -S openldap

cliente gráfico
sudo pacman -S gq


# Uso
Informacion sobre el usuario (busca la entrada estilo passwd en el server)
getent passwd pepito

getent group NOMBREGRUPO
  usuarios de ese grupo

ldapwhoami

$ ldapmodify <<EOF
dn: YOUR_DN
changetype: modify
replace: loginShell
loginShell: /bin/bash
-
EOF


(YOUR_DN might be in the form uid=$USER,ou=people,dc=example,dc=org; try ldapwhoami to see)

ldapsearch -xLLL -b "dc=aa,dc=bb,dc=net"
  nos da toda la info que tiene la máquina sobre dc=AA,dc=BB,dc=CCC


Mirar a que grupos pertenece un usuario:
ldapsearch -x -h host.ldap.com -b ou=Group,dc=AA,dc=BB,dc=CCC memberUid=USUARIO | grep "^cn"

Buscar con un filtro de fecha
ldapsearch -x -h host.ldap.com -b ou=Group,dc=AA,dc=BB,dc=CCC "whenChanged>20160428073751.0Z"


-sh-4.1$ ldapsearch -x -LLL -s "base" -b "" supportedSASLMechanisms
dn:
supportedSASLMechanisms: GSSAPI


ldapadd      ldapdelete   ldapmodify   ldappasswd   ldapurl      
ldapcompare  ldapexop     ldapmodrdn   ldapsearch   ldapwhoami


Activar LDAP
yum install authconfig openldap-clients nss-pam-ldapd sssd
authconfig --enableshadow --enablemd5 --enablemkhomedir --enableldap --enableldapauth --ldapserver=SERVIDORLDAP --ldapbasedn="dc=AA,dc=BB,dc=CC" --enableldaptls --enablelocauthorize --updateall
wget -O /etc/openldap/cacerts/CERTIFICADO.crt http://SERVIDOR/pub/GPG-KEYS/CERTIFICADO.crt
chmod 444 /etc/openldap/cacerts/*
cacertdir_rehash /etc/openldap/cacerts/

