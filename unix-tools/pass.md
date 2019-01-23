https://www.passwordstore.org

App para gestionar un almacen de clave estilo keepass pero mediante consola.

App para android: https://play.google.com/store/apps/details?id=com.zeapo.pwdstore

App X11: qtpass
yaourt -S qtpass

Mi version modificada (ultimos commits del repo oficial mas mi cambio para tener -e. Lo ultimo del repo oficial está más adelantado de la 1.6.3):
https://github.com/adrianlzt/password-store/releases/tag/1.6.3-1

Extensiones
https://github.com/tijn/awesome-password-store/blob/master/README.md


# Chequear passwords
https://gitlab.com/roddhjav/pass-audit
yay pass-audit

Chequea las passwords contra la base de datos de HaveIBeenPowned y una lib de Dropbox
pass audit NOMBRE


# Aging de la passwords
https://github.com/tijn/pass-age

pass age NOMBRE


# Para grupos
https://github.com/keymon/password-store-for-teams
http://git.ucc.asn.au/?p=zanchey/uccpass.git;a=summary

# Para ssh
https://github.com/jlesquembre/pass-sshaskpass

# gopass
App en go estilo spotlight de mac
https://github.com/cortex/gopass
Instalar: go get github.com/cortex/gopass
Llamar como: PINENTRY_USER_DATA=gnome3 /home/adrian/.gvm/pkgsets/go1.6.2/global/bin/gopass
  Mirar en gnupg.md el tema de tener un pinentry que se pueda modificar con una variable de entorno

Crear /usr/local/bin/gopass:
PINENTRY_USER_DATA=gnome3 /home/adrian/.gvm/pkgsets/go1.6.2/global/bin/gopass

Y asociar el key-binding Ctrl+Mays+s

# pext
https://github.com/TheLastProject/Pext

como gopass pero en python

# rofi-pass
https://github.com/carnager/rofi-pass


Migrar de otras plataformas: https://www.passwordstore.org/#migration
Exportar de keepassx en csv y usar keepass2csv2pass.py (en este dir)

La idea es tener un repo privado donde almacenar las contraseñas en ficheros encriptados con nuestras llaves GPG.
Desde el movil sincronizamos este repo para tener ahi las llaves.


# Inicio
pass init correo@email.com
pass git init
pass git remote add origin kexec.com:pass-store

# Generar una clave aleatoria
pass generate -n Amazon/amazonemail@email.com 21
  genera una clave alfanumerica de 21 caracteres y la saca por pantalla
  con -c no la muestra, solo la pone en el clipboard
  si quitamos -n nos pone caracteres no alfanuméricos

pass generate -ni path/ya/existente
  genera una clave alfanumerica para una entrada que ya existe
  el resto de metadatos los conserva

# Insertar una clave
pass insert email/gmail/pepito@gmail.com
  aqui pregunta por la clave

pass add path/clave -m
  permite meter varias lineas (pulsar Control+D para terminar)
  add e insert es lo mismo

# Edit
pass edit path/clave
  nos abre un editor en la clave para poder editarla

# Borrar
pass rm path/clave

# Buscar
pass find clave
pass grep palabra
  esto busca dentro del contenido encriptado

# Mostrar
pass path/clave

pass -c path/clave
  copia la clave al clipboard (copia la primera linea)

# Push/pull
pass git push
pass git pull


# Almacenar ficheros
pass insert secret-image -m <icon.png
pass show secret-image >retrieved-image.jpg
