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
ldapsearch -h host.ldap.com -b ou=Group,dc=AA,dc=BB,dc=CCC -x memberUid=USUARIO | grep "^cn"


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
