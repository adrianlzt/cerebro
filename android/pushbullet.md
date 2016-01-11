https://www.pushbullet.com

Pushbullet is the easiest way to send links, files, and more between computers, smartphones, and friends.

Links that open right into Chrome from the notification so you can get there fast.

Quick notes & reminders that show up right into your notification tray.

Getting pictures from your computer onto your phone has never been easier.

Files download automatically and can be opened right from your notifications.

Put a checklist right in your notification tray and check things off as you go.

Send addresses that take you right into Google Maps for easy directions.


# API
pip install pushbullet.py
from pushbullet import Pushbullet
pb = Pushbullet(api_key)
push = pb.push_link("Cool site", "https://github.com", body="texto")


https://docs.pushbullet.com/#get-user
https://docs.pushbullet.com/#list-devices


Obtener mi id:
curl --header 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/users/me | jq '.'


Enviarme push:
curl -H 'Content-Type: application/json' -H 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/pushes -d '{"body":"Space Elevator, Mars Hyperloop, Space Model S (Model Space?)","title":"Space Travel Ideas","type":"note"}'

Enviar un push con un enlace:
curl -H 'Content-Type: application/json' -H 'Access-Token: MITOKEN' https://api.pushbullet.com/v2/pushes -d '{"body":"Nueva casa de 500€ con tal","title":"Idealista, nueva casa","type":"link", "url":"http://www.google.es"}'

