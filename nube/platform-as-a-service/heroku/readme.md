https://www.heroku.com/

Deliver apps, the right way.
Tools you know. Technologies you love. People you work with.

Te dan un "dyno" (proceso) gratis por cada cuenta.

# Codigo
Buildpacks are responsible for transforming deployed code into a slug, which can then be executed on a dyno
https://devcenter.heroku.com/articles/buildpacks

## Python
https://devcenter.heroku.com/articles/getting-started-with-python#introduction

Skel con bottle: https://github.com/guaq/heroku-in-a-bottle
Recordar hacer commit antes del push


# Herramientas

## Instalcion Arch
yaourt -S aur/heroku-toolbelt

## Uso
Para registrarnos:
heroku login

### Crear app
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
