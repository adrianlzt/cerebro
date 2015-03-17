Ejemplos de arch linux:

# cat cups
auth            required        pam_unix.so
account         required        pam_unix.so
session         required        pam_unix.so

Comprueba que el user y la contraseña son correctos contra /etc/shadow
Comprueba si debe cambiar la contraseña porque haya expirado.
Escribe en el log la entrada y salida del usuario



# cat chpasswd
#%PAM-1.0
auth            sufficient      pam_rootok.so
auth            required        pam_unix.so
account         required        pam_unix.so
session         required        pam_unix.so
password        required        pam_unix.so sha512 shadow

Deja pasar sin contraseña a root
Comprueba que el user y la contraseña son correctos contra /etc/shadow
Comprueba si debe cambiar la contraseña porque haya expirado.
Escribe en el log la entrada y salida del usuario
Cambia la contraseña en /etc/shadow codificándola como sha512



# cat system-auth
#%PAM-1.0

auth      required  pam_unix.so     try_first_pass nullok
auth      optional  pam_permit.so
auth      required  pam_env.so

account   required  pam_unix.so
account   optional  pam_permit.so
account   required  pam_time.so

password  required  pam_unix.so     try_first_pass nullok sha512 shadow
password  optional  pam_permit.so

session   required  pam_limits.so
session   required  pam_unix.so
session   optional  pam_permit.so

Chequea el password del usuario contra /etc/shadow. Si esto está siendo llamado desde otra policy, prueba la password si el usuario ya hubiese metido una. Permite passwords vacías.
pam_permit está para permitir el acceso si pam_unix no estuviese disponible ("optional": solo se usa si no hay otro modulo auth disponible)
pam_env, carga variables de entorno

Comprueba si debe cambiar la contraseña porque haya expirado.
Comprueba si el usuario tiene acceso según lo definido en /etc/security/limits.conf

Si se va a cambiar la contraseña, si venía es un stack se pone la ya solicitada, se permite null, y debe codificarse con sha512

Se ponen limites al usuario segun /etc/security/limits.conf
Se escribe en el log la entrada y salida del usuario




# cat system-login
#%PAM-1.0

auth       required   pam_tally.so         onerr=succeed file=/var/log/faillog
auth       required   pam_shells.so
auth       requisite  pam_nologin.so
auth       include    system-auth

account    required   pam_access.so
account    required   pam_nologin.so
account    include    system-auth

password   include    system-auth

session    optional   pam_loginuid.so
session    include    system-auth
session    optional   pam_motd.so          motd=/etc/motd
session    optional   pam_mail.so          dir=/var/spool/mail standard quiet
-session   optional   pam_systemd.so
session    required   pam_env.so


Loguea intentos fallidos de login en /var/log/faillog
Chequea que el usuario tiene una shell valida, y que /etc/shells no es o+w
Si /var/run/nologin o /etc/nologin existen, no deja pasar a los usuarios (si a root)
Se ejecuta el stack de system-auth

Se decide si el usuario puede pasar según la configuración de /etc/security/access.conf

loginuid: sets the loginuid process attribute for the process that was authenticated. Usado por systemd
muetra el fichero /etc/motd
avisa al usuario si tiene algun email
pam_systemd: registers user sessions with the systemd login manager (man pam_systemd)


# cat passwd 
#%PAM-1.0
#password       required        pam_cracklib.so difok=2 minlen=8 dcredit=2 ocredit=2 retry=3
#password       required        pam_unix.so sha512 shadow use_authtok
password        required        pam_unix.so sha512 shadow nullok

Diferentes lineas para forzar a que las passwords sean fuertes, y puedan ser null
