https://ask.fedoraproject.org/en/question/9822/how-do-i-disable-tracker/

Indexador de datos.
Parece que a veces da problemas y se come la CPU

Abrir preferencias y deshabilitarlo: tracker-preferences


Estado:
tracker daemon

Parar todo
tracker daemon -t


Para quitarlo del arranque:
sudo vi /etc/xdg/autostart/tracker-*
X-GNOME-Autostart-enabled=false

