http://linux-pam.org/Linux-PAM-html/sag-pam_tally.html

Registro de logins de usuarios

Tiene que estar cargado el modulo pam_tally en el stack del login del sistema.
Generalmente se alamacenan los datos en /var/log/faillog
Solo se logeua intentos de usuarios existentes.

Se puede bloquear un usuario tras n entradas fallidas. Se puede hacer que no pueda acceder durante x tiempo.

# pam_tally
User adrian (1000) has 2




# Errores
pam_tally2
/usr/bin/pam_tally2: No such file or directory

Se arregla creando el fichero de log:
sudo touch /var/log/tallylog
