Si tengo la Freebox, tiene un mecanismo para compartir carpetas.

Telegram @filetobot

<https://driveuploader.com/>
app que usa nuestro drive para recibir ficheros de un tercero

Compartir con curl:
curl -T fichero oshi.at

curl -v --upload-file ./hello.txt <https://transfer.sh/hello.txt>
<https://transfer.sh/66nb8/hello.txt>

Opción similar:
curl -vT fichero <https://temp.sh>

# magic-wormhole

<https://github.com/warner/magic-wormhole>
Compartir ficheros, o pequeños texos, usando únicamente dos palabras legibles.
Tenemos que instalar el cliente python.
Enviamos el fichero, genera las dos palabras.
La otra persona ejecuta el cliente, mete las dos palabras y recibe el fichero
pacman -S magic-wormhole
wormhole send fichero
Nos da un comando que tiene que ejecutar la otra persona.

# croc

<https://github.com/schollz/croc>

Enviar:

```
croc send [file(s)-or-folder]
```

Recibir:

```
croc code-phrase
```

# sharedrop

<https://www.sharedrop.io>
compartir ficheros entre usuarios de la misma red de manera directa (P2P). Usa WebRTC

# sharefest

<https://sharefest.me>
compartir ficheros entre usuarios via p2p (parecido a torrent pero usando webrtc)
Parece que ya NO EXISTE

# otros

dat parecido a torrent
upspin acceso a ficheros via user@email/path/fichero
camlistore

<https://takeafile.com/>
Compartimos un fichero con otro usuario enviandolo en el momento a través de uno del los servidores de la web

<https://filetea.me/>
CLI: <https://github.com/ogarcia/FileTeaSend>
filetea fichero
nos da una URL. Mientras tengamos el programa corriendo estaremos compartiendo el fichero
yaourt fileteasend-git (roto por ahora)

landrop
necesita cliente
<https://www.redeszone.net/tutoriales/redes-cable/enviar-archivos-landrop-red/>
