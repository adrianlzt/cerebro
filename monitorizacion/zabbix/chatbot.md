Chatbot en python
https://github.com/erigones/Ludolph

# Telegram
bot para telegram
https://github.com/ableev/Zabbix-in-Telegram

https://web.telegram.org/#/im?p=@BotFather

git clone git@github.com:ableev/Zabbix-in-Telegram.git
cd Zabbix-in-Telegram
cp zbxtg_settings.example.py zbxtg_settings.py
  poner API key de telegram
  url del zabbix web, user y pass

Copiar zbxtg_settings.py y zbxtg.py en /usr/lib/zabbix/alertscripts
Python tiene que tener la lib: requests

https://github.com/ableev/Zabbix-in-Telegram/wiki/Working-with-Zabbix-3.0
Configurar el script zbxtg.py como un nuevo Media Type
  Script name: zbxtg.py
  Tres params: {ALERT.SENDTO} {ALERT.SUBJECT} {ALERT.MESSAGE}

Agregar este "Media Type" a los usuarios que necesitemos avisar.

Crear un nuevo Action. Dentro de este action, en Operations:
  Send to User Groups: elegir a quien aplica este action
  Send only to: Telegram

Testear:
python zbxtg.py "adrianlzt" "subject" "zbxtg;graphs
zbxtg;itemid:28265
zbxtg;title:MIHOST - MITRIGGER
" --debug


# Errores
AttributeError: 'module' object has no attribute 'packages'
  version antigua de la lib requests.
  comentar la linea requests.packages.urllib3.disable_warnings(), y poner un "pass" para que no proteste el if
