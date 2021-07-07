Convertir openssh public key en PEM:
ssh-keygen -f id_rsa.pub -e -m pem

Generar clave pública a partir de clave privada:
ssh-keygen -f id_rsa -y
ssh-keygen -f dsmctools.pem -y > dsmctools.pub


Desencriptar clave privada
openssl rsa -in ~/.ssh/id_rsa > id_rsa.decrypted



# Tipos de claves
dsa | ecdsa | ecdsa-sk | ed25519 | ed25519-sk | rsa

You can use the OpenSSH options PubkeyAcceptedKeyTypes or HostKeyAlgorithms to enforce SHA2 usage. (Note that the key type on file remains "ssh-rsa", only the handshake changes.)

Segun https://access.redhat.com/solutions/4906221 en RHEL8 ya no se soportan las claves ssh-rsa.
Salta el mensaje:
/var/log/secure
TIMESTAMP sshd[PID]: userauth_pubkey: key type ssh-rsa not in PubkeyAcceptedKeyTypes [preauth]

Razón: ssh-rsa keys are not FIPS-140-2 compliant

Solución, usar una clave más segura:
Generate a new key which is compliant with FIPS-140-2, for example ECDSA with curve nistp256.


Tipos de claves públicas soportadas por un server:
sshd -T|egrep "pubkeyauthentication|pubkeyacceptedkeytypes" | tr ',' '\n'
