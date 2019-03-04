https://www.passwordstore.org
Usar version go: https://github.com/gopasspw/gopass
  https://github.com/gopasspw/gopass/blob/master/docs/features.md
  lo único malo es que no soporta extensiones
  se puede usar con Summon (https://cyberark.github.io/summon/). Esto permite hacer cosas tipo: summon mi-comando (y que mi-comando tenga unas variables de entorno con passwords sacadas de pass)
  hace automáticamente push al hacer modificaciones (origin y al otro remote via hook)

  Inicio, si ejecutamos "gopass" y no tenemos nada, nos creará las claves y nos preguntará para poder inicializar nuestro entorno.
  Me falla al generar las claves si no existen, mejor crearlas antes:
  gpg --gen-key
  Al terminar, para ver mis claves:
  gpg -K

  Config en ~/.config/gopass

  Activar debug: GOPASS_DEBUG=true gopass ...

  Activar autocompletado bash: source <(gopass completion bash)
  echo "gopass datadope/carrefour/test " >> .bashrc

  Insertar "foo: bar" en el fichero
  pass insert some/path foo
  > bar

  almacenar binarios:
    gopass binary cp fichero algun/sitio
    gopass binary cp algun/sitio fichero

  Multiples stores https://github.com/gopasspw/gopass/blob/master/docs/features.md#multiple-stores
    Crear una nueva store:
    gopass init --store mount-point --path /path/to/store

    Montarla:
    gopass mounts add mount-point /path/to/store

    Desmontarla
    pass mounts remove mount-point


  API JSON: https://github.com/gopasspw/gopass/blob/master/docs/jsonapi.md
    echo '+\0\0\0{"type":"query", "query": "test123456789"}'| gopass jsonapi listen
    Hace falta pasarle como cabecera la longitud de los datos: Each JSON-UTF8 encoded message is prefixed with a 32-bit integer specifying the length of the message.
    Complicado con la consola. Usar este helper: https://github.com/gopasspw/gopassbridge/tree/master/test-client
    echo '{"type":"getData", "entry": "entrada/foo"}' | ./test-client  | gopass jsonapi listen
    echo '{"type":"getLogin", "entry": "entrada/foo"}' | ./test-client  | gopass jsonapi listen

App para gestionar un almacen de clave estilo keepass pero mediante consola.

App para android: https://play.google.com/store/apps/details?id=com.zeapo.pwdstore

App X11: qtpass
yaourt -S qtpass

Extension web: github.com/gopasspw/gopassbridge
Modificada para quitar el dominio (.com)
https://github.com/adrianlzt/gopassbridge
cargar desde chrome chrome://extensions/ con "Carga descromprimida", despues de hacer un:
make clean
make package
E instalar en chrome apuntando al dir gopassbridge/chrome-release
Hara falta ejecutar de nuevo "gopass jsonapi configure"
Habrá que modificar el fichero /home/adrian/.config/chromium/NativeMessagingHosts/com.justwatch.gopass.json para poner el id que nos haya asignado chrome


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
