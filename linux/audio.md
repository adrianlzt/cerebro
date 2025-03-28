Parece que lo normal en linux ahora es usar pipewire.
Creo que por debajo puede usar pulseaudio, jack, alsa, etc.

# Sistemas de audio

Pulseaudio, el más típico.
Jack, más profesional.
PipeWire, el más reciente.

# Pipewire

Para ver un gráfico de las conexiones (patch), para pipewire
qpwgraph

## Cli

Volcar la información en JSON

```bash
pw-dump
```

### pw-cli

Esto lo saqué de LLM, pero no parece funcionar (pero tampoco da error).

Crear un null sink (nodo de captura/escucha):

```bash
pw-cli create-node adapter '{ factory.name=support.null-audio-sink node.name="VirtualMicSink" node.description="Virtual Mic" media.class=Audio/Sink }'
```

Crear un nodo loopback (micrófono virtual):

```bash
pw-cli create-node adapter '{ factory.name=support.null-audio-source node.name="VirtualMicSource" node.description="Virtual Mic Source" media.class=Audio/Source }'
```

Unir el sink con el source:

```bash
pw-link VirtualMicSink:output_FL VirtualMicSource:input_FL
pw-link VirtualMicSink:output_FR VirtualMicSource:input_FR
```

### WirePlumber

<https://wiki.archlinux.org/title/WirePlumber>
wpctl status

Config renames y disabled devices:
$HOME/.config/wireplumber/main.lua.d/

# PulseAudio

## Admin

Comprobar si está arrancado (devolverá RC=0)
pulseaudio --check

Restart:
systemctl --user restart pulseaudio

## Varios

Herramienta
pavucontrol - gestion grafica del sonido
pactl

stat
muestra el default sink y source.

pactl list sinks
nos muestra el listado de devices que se puede configurar como salida

Muestra micros (entradas):
pactl list sources short

Modificar volumen de un sink
pactl set-sink-volume 0 +10%

Poner el microfono y altavoces al jabra:
pactl set-default-sink alsa_output.usb-GN_Netcom_A_S_Jabra_EVOLVE_20_MS_000135D0656C09-00.analog-stereo
pactl set-default-source alsa_input.usb-GN_Netcom_A_S_Jabra_EVOLVE_20_MS_000135D0656C09-00.analog-mono

Configuración
/etc/pulse/default.pa

Poner unos cascos USB como entrada/salida por defecto al conectarlos:
<https://wiki.archlinux.org/index.php/PulseAudio#Automatically_switch_to_Bluetooth_or_USB_headset>

pactl load-module module-switch-on-connect

Para hacerlo persistente:
/etc/pulse/default.pa
load-module module-switch-on-connect

# Bluetooth

Una vez conectado (mirar linux/bluetooth.md) deberemos ver en "pavucontrol" el dispositivo de entrada y salida.

## HSP / HDF

Linux tiene mal soporte para HSP/HDF.
Hay una rama para tener mejor soporte.
Parece que el desarrollador de estas extensiones y la gente de pulseaudio están peleados de forma irreconciliable: <https://github.com/pali/hsphfpd-prototype/issues/11>

En arch/AUR instalar:
yay -S hsphfpd-git
yay -S pulseaudio-hsphfpd pulseaudio-equalizer-hsphfpd pulseaudio-bluetooth-hsphfpd

Para poder instalarlo primero tengo que borrar:
pacrem pulseaudio-bluetooth pulseaudio-alsa gnome-bluetooth blueberry

Tenemos que arrancar primero hsphfpd antes de pulseaudio:
sc-start hsphfpd
systemctl --user restart pulseaudio

Con los galaxy buds consigo grabar si configuro el input como perfil HFP, pero la calidad es malo (sonido lata), pero se entiende bien.

# Modulo para suprimer ruido / cadmus

<https://github.com/werman/noise-suppression-for-voice>
UI:
<https://github.com/josh-richardson/cadmus/>
<https://github.com/lawl/NoiseTorch>

# Retransmitir audio

<https://superuser.com/a/1021823/526882>

```
pactl list | grep "Monitor Source"
cvlc -vvv pulse://XXXX --sout '#transcode{acodec=mp3,ab=128,channels=2}:standard{access=http,dst=0.0.0.0:8888/pc.mp3}'
```

ejemplo:

Desde otro navegador abrir:
<http://ip.de.mi.pc:8888/pc.mp3>

# Problemas audio

En un chip intel, no tenía micro y fallaba el audio.
Arreglado instalando el paquete: sof-firmware

# Sox

para editar audio

# Mezclar micro más otra entrada

Lo que queremos hacer es que una aplicación grabe al mismo tiempo el micrófono junto con algo que se está reproduciendo.

Usando qpwgraph es muy sencillo

Empezamos la app que graba eligiendo nuestro micro.
Luego en qpwgraph añadimos también la salida de lo otro que se esté reproduciendo también a lo que graba.

Haciendo una prueba de micro + video de youtube, el video se escucha entrecortado.
Pero parece que era culpa de la app, porque con <https://studio.opencast.org/> funciona bien.
