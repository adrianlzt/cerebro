PulseAudio

Herramienta
pavucontrol - gestion grafica del sonido
pacmd

stat
muestra el default sink y source.

list-sinks
nos muestra el listado de devices que se puede configurar como salida


Poner el microfono y altavoces al jabra:
pacmd set-default-sink alsa_output.usb-GN_Netcom_A_S_Jabra_EVOLVE_20_MS_000135D0656C09-00.analog-stereo
pacmd set-default-source alsa_input.usb-GN_Netcom_A_S_Jabra_EVOLVE_20_MS_000135D0656C09-00.analog-mono


Configuración
/etc/pulse/default.pa

Poner unos cascos USB como entrada/salida por defecto al conectarlos:
https://wiki.archlinux.org/index.php/PulseAudio#Automatically_switch_to_Bluetooth_or_USB_headset

pactl load-module module-switch-on-connect

Para hacerlo persistente:
/etc/pulse/default.pa
load-module module-switch-on-connect




# Retransmitir audio
https://superuser.com/a/1021823/526882

pactl list | grep "Monitor Source" 
cvlc -vvv pulse://XXXX --sout '#transcode{acodec=mp3,ab=128,channels=2}:standard{access=http,dst=0.0.0.0:8888/pc.mp3}'

Desde otro navegador abrir:
http://ip.de.mi.pc:8888/pc.mp3
