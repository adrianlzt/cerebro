https://github.com/gogits/gogs
https://gogs.io/docs

Servidor git en go.
Sencillo de desplegar pero sin tantas funciones como github o gitlab.


# Conf
Opciones disponibles
https://gogs.io/docs/advanced/configuration_cheat_sheet


# Migrate / Mirror
https://github.com/gogits/go-gogs-client/wiki/Repositories#migrate

Podemos usar gogs para migrar un repo que tengamos en  otro lado.
Tambien podemos usar gogs para hacer mirror de un repo (seleccionar "mirror" al crear la migración)
  Por defecto se sincronizará cada hora (cron.update_mirrors SCHEDULE)



# API
https://github.com/gogits/go-gogs-client/wiki

Ejemplo:
curl -u adri:adri http://localhost:3000/api/v1/user
curl -u adri:adri http://localhost:3000/api/v1/user/repos | jq


# Dev
Hace falta tener instalado lessc (sudo pacman -S community/nodejs-less)
go get -u github.com/gogits/gogs
cd $GOPATH/src/github.com/gogits/gogs
make

Si queremos soporte para sqlite tendremos que editar el Makefile
TAGS="sqlite"

La conf se genera en:
custom/conf/app.ini
