Arreglado como decía oscar:
pacman -Rsc nvidia nvidia-utils xf86-video-intel
pacman -S vulkan-intel libva-intel-driver

con xf86-video-intel funciona igual
Pero con esta configuracion no me funciona suspender.
Al recuperar se queda pillado.

He instalando nvidia, y ahora funciona todo bien.

Al final tengo:
linux 4.11.6-3
libva-intel-driver 1.8.2-1
nvidia 381.22-3
nvidia-utils 381.22-1
vulkan-intel 17.1.3-1
xf86-video-intel 1:2.99.917+777+g6babcf15-1

