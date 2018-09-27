https://stackiq.github.io/Quickstart

A los hosts donde vamos a instalar el SO les llaman backend.

Por defecto instalará una imagen centos.

Podemos arrancar el discovery
discover-nodes

En cuanto aparezca un nodo con PXE se pondrá a instalar la imagen base.

Si ya vemos que lo ha detectado podemos salir (F8) y ver como va el estado:
watch -n 2 "stack list host"

