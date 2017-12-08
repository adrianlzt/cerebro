Generalmente las password en ldap se almacenan en el formato SSHA (SHA con Salt).
Si queremos encriptar una contraseña haremos:
slappasswd -s mipass


El manager de LDAP se define en la conf
cat /etc/openldap/slapd.conf | grep "^root"
rootdn      cn=Manager,dc=example,dc=com
rootpw      {SSHA}FoVeQh9x0RRe5sgHGvY9HHiSwRQ==
