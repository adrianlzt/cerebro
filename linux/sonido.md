En ubuntu: amixer

Cambiar volumen
amixer set Master 15%

Cambiar captura del micro
amixer set Capture 100%



Tarjetas
cat /proc/asound/cards



Sacar el audio por todos los outputs disponibles (nos quedamos sin micro)
https://askubuntu.com/questions/78174/play-sound-through-two-or-more-outputs-devices?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
pacman -S paprefs
paprefs
  Simultaneous Output

reiniciar pulseaudio: pulseaudio -k
