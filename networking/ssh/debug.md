ssh -v host
ssh -vvvv host

ssh -G host
  mirar que config va a aplicar, no conecta

# ssh-audit
https://github.com/arthepsy/ssh-audit
SSH server auditing: banner, key exchange, encryption, compatibility, security...

pip install ssh-audit
parece que roto (feb'23)

aur/ssh-audit
ssh-audit 80.123.43.23


# Comprobar configuraciones

Para openssh, obtener la lista de parámetros usados por el servidor, la config, no el runtime:
sshd -T

Para el cliente, mostrar la config que va a usar:
ssh -G user@IP
