Convertir openssh public key en PEM:
ssh-keygen -f id_rsa.pub -e -m pem

Generar clave pública a partir de clave privada:
ssh-keygen -f id_rsa -y
ssh-keygen -f dsmctools.pem -y
