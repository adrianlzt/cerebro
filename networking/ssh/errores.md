http://www.openssh.com/legacy.html

Unable to negotiate with 217.160.71.110: no matching host key type found. Their offer: ssh-dss
ssh -oHostKeyAlgorithms=+ssh-dss user@host

Unable to negotiate with 10.0.0.118 port 22: no matching key exchange method found. Their offer: diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1
ssh -oKexAlgorithms+=diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1 ...

Host nas
  HostName 192.168.8.109
  HostKeyAlgorithms=+ssh-dss

no matching cipher found. Their offer: ...
ssh -c 3des-cbc ..

send_pubkey_test: no mutual signature algorithm
https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html
ssh-rsa con SHA1 deprecated en el cliente posiblemente.
En el ssh config de ese host meter:
PubkeyAcceptedKeyTypes +ssh-rsa



El servidor no acepta la clave pública.
Mirar si selinux está activado.

Too many authentication failures for
  -> mirar max_auth_tries.md

Mucho tiempo en logear
http://injustfiveminutes.com/2013/03/13/fixing-ssh-login-long-delay/



No puedo conectar usando un proxy command
Comprobar que se está pasando la clave haciendo: ssh -A servidorDeSalto
Si el servidor esta en la lista de known_hosts y la clave no coincide no se pasará las claves con -A



