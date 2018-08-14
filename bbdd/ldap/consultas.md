## Consultas
https://access.redhat.com/documentation/en-US/Red_Hat_Directory_Server/9.0/html/Administration_Guide/Examples-of-common-ldapsearches.html

### Anónimas
ldapsearch -h SERVERLDAP -x
  obtenemos todo el arbol

ldapsearch -h SERVERLDAP -x -b BASE FILTER

Preguntamos al servidor ldap de forma anónima.
Se hace un bind pero sin login.

FILTER:
"(uid=alt390)" cn sn
  Buscar entradas con uid=alt390 y mostrar solo su cn y sn

### Con bind (logueadas)
ldapsearch -h SERVERLDAP -D uid=USUARIO,ou=users,dc=grafana,dc=org -w PASSWORD -b BASE

Primero hacemos un bind al servidor con nuestro usuario (definiendo el DN entero) y la password.
Una vez unidos podremos hacer la consulta.

Generalmente, cuando usamos un software con integración con LDAP, lo que probará es a hacer un bind con el user/pass que le pasemos.


Por defecto ldapsearch nos da todas las entradas por debajo de la base.
Si queremos restringir para no "bajar" de un nivel usaremos:
-s base

Bajar solo un nivel:
-s one

Si queremos que no corte las lineas:
-o ldif-wrap=no


# Buscar por un campo
ldapsearch -h 127.0.0.1:10389 -D "cn=Directory Manager" -w password -b "dc=example,dc=edu" "(cn=adri*)"

# Consultar las base DN disponibles
ldapsearch -h 127.0.0.1:10389 -D "cn=Directory Manager" -w password -b "" -s base | grep namingContexts


# Añadir entradas
ldapadd -h server -D "cn=Directory Manager" -w password
# alopez, People, example.edu
dn: uid=alopez,ou=People,dc=example,dc=edu
objectClass: organizationalPerson
objectClass: person
objectClass: top
objectClass: inetOrgPerson
givenName: Adrian
uid: alopez
sn: Lopez
cn: Adrian Lopez
Control+D

O si tenemos un fichero con los datos
ldapadd -h server -D "cn=Directory Manager" -w password -f fichero

## Crear un grupo
ldapadd -h server -D "cn=Directory Manager" -w password
dn: cn=splunk3,ou=Tools,ou=Groups,dc=example,dc=edu
objectClass: top
objectClass: groupofuniquenames
description: InfluxDB DSMC Tools groups

Si es un ou será:
objectClass: organizationalunit



# Modificar entradas
ldapmodify -D "cn=directory manager" -w secret -p 389 -h server.example.com

dn: cn=MemberOf Plugin,cn=plugins,cn=config
changetype: replace
replace: memberofattr
memberofattr: memberOf

CUIDADO! no se pueden poner espacios en blanco al final de linea

## Añadir a un grupo
ldapmodify -h 127.0.0.1:10389 -D "cn=directory manager" -w password
dn: cn=novagroup,ou=Groups,dc=example,dc=edu
changetype: modify
add: uniqueMember
uniqueMember: uid=dse,ou=People,dc=example,dc=edu


# Borrar entradas
ldapdelete -h 127.0.0.1:10389 -D "cn=Directory Manager" -w password uid=jose,ou=People,dc=example,dc=edu

-r para borrar recursivamente

-f fichero
  en el fichero ponemos en cada linea un DN que queremos borrar
