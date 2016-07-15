# Instalcion Arch
yaourt -S aur/heroku-toolbelt

# Registro
Para registrarnos:
heroku login

# Comandos
heroku help

# Crear app
heroku create NOMBRE --buildpack heroku/python --region eu

Crear un repo y subirlo:
cd my-project/
git init
heroku git:remote -a ing-notificador
  esto configura el remote con heroku

Subir codigo:
git add .
git commit -am "make it better"
git push heroku master

# Logs
heroku logs

heroku logs -t
  como tail -f


# Parar app
heroku ps:scale web=0

Rearrancar
heroku ps:scale web=1
