Para un server tenemos que usar una key cuyas armaduras sean:
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----

Creo que se genera con:
ssh-keygen -f keyPath -t rsa -N ""
