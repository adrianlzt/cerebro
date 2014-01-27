Informacion sobre el usuario (busca la entrada estilo passwd en el server)
getent passwd pepito

ldapwhoami

$ ldapmodify <<EOF
dn: YOUR_DN
changetype: modify
replace: loginShell
loginShell: /bin/bash
-
EOF

(YOUR_DN might be in the form uid=$USER,ou=people,dc=example,dc=org; try ldapwhoami to see)


-sh-4.1$ ldapsearch -x -LLL -s "base" -b "" supportedSASLMechanisms
dn:
supportedSASLMechanisms: GSSAPI


ldapadd      ldapdelete   ldapmodify   ldappasswd   ldapurl      
ldapcompare  ldapexop     ldapmodrdn   ldapsearch   ldapwhoami
