Glosario
http://www.zytrax.com/books/ldap/apd/

# Conceptos
CN = Common Name (grupos)
OU = Organizational Unit (directorios)
DC = Domain Component (definiciones para alto nivel)
DN = el "path" completo del objeto

Atributos: son los valores que van asociados a cada DN
Por defecto todo es case insensitive

La idea es un servidor donde se almacenan datos de usuarios: nombre, email, uid, etc

Cuando alguien quiere loguearse en nuestro sistema, si lo tenemos integrado con ldap, pasaremos el user y pass a ldap para ver si existe.

LDAP se estructura como un arbol de directorios.

Lo más "alto" será la base que habrá definido nuestra organización. Para esto parece que se suelen usar los DC (uno o varios)
Por ejemplo: dc=grafana,dc=org

Por debajo de esta base tendremos otros "directorios", por ejemplo uno para usuarios: ou=users,dc=grafana,dc=org
Otro podría ser de grupos: ou=groups,dc=grafana,dc=org

Dentro de usuarios tendremos, por ejemplo, usuarios con dn estilo: uid=AAA,ou=groups,dc=grafana,dc=org
Dentro de cada usuario tendremos otro montón de parámetros como nombre, apellidos, direccion, etc
