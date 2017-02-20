https://www.pushbullet.com

Pushbullet is the easiest way to send links, files, and more between computers, smartphones, and friends.

Links that open right into Chrome from the notification so you can get there fast.

Quick notes & reminders that show up right into your notification tray.

Getting pictures from your computer onto your phone has never been easier.

Files download automatically and can be opened right from your notifications.

Put a checklist right in your notification tray and check things off as you go.

Send addresses that take you right into Google Maps for easy directions.


# API

## Python
pip install pushbullet.py
from pushbullet import Pushbullet
pb = Pushbullet(api_key)
push = pb.push_link("Cool site", "https://github.com", body="texto")
pb.push_note("titulo","texto")

## Go
programacion/go/pushbullet.md

https://docs.pushbullet.com/#get-user
https://docs.pushbullet.com/#list-devices


Obtener mi id:
curl --header 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/users/me | jq '.'


Enviarme push:
curl -H 'Content-Type: application/json' -H 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/pushes -d '{"body":"Space Elevator, Mars Hyperloop, Space Model S (Model Space?)","title":"Space Travel Ideas","type":"note"}'

Enviar un push con un enlace:
curl -H 'Content-Type: application/json' -H 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/pushes -d '{"body":"Nueva casa de 500€ con tal","title":"Idealista, nueva casa","type":"link", "url":"http://www.google.es"}'

Enviar a otra persona:
Poner "email": "otra@persona.com" en el JSON

Borar push
curl -XDELETE -H 'Content-Type: application/json' -H 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/pushes/udxSasjz2LcxwwXk


# Programar envio
at 14:50
source .zsh/auto.d/alias.zsh
pushbullet Titulo Mensaje largo con varias cosas
Control+D


source ~/.bash_aliases


# Envios con imagen custom
Creamos un cliente: https://www.pushbullet.com/#settings/clients
En website ponemos cualquier cosa: http://cosa.null
Ponemos la imagen que queramos
En redirect_uri ponemos: https://www.pushbullet.com/login-success

Guardamos y pinchamos sobre el link de "oauth test url: click here"
Luego damos a "Approved"
Nos redireccionará a una web. En la URL encontraremos el token para enviar peticiones como esta app

Puede que tarde un rato en dejarnos enviar pushes (en el json nos pondra dismissed a true)
