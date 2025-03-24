Terminal multiplexer.

# Configuración

.config/zellij

Abrir config leader keys: Control o + c

# Docs

<https://zellij.dev/screencasts>

<https://github.com/zellij-org/awesome-zellij>

# Tips

Abrir el contenido de la terminal en $EDITOR: control s +e
Esto nos puede valer para copiar texto.

Copiar, seleccionar con el ratón, se copiará al clipboard.
Podemos usar control+click si quieremos enviar el ratón a la aplicación que tengamos abierta.

# Themes

<https://zellij.dev/documentation/theme-list>

<https://zellij.dev/documentation/themes>

# Layouts

default
classic
compact: quita la barra de abajo, la del menu de control / alt
disable-status-bar: como compact pero quitando también la barra de status de abajo
strider: abre un navegador de ficheros en un pane estrecho a la izquierda. Los ficheros que seleccionamos los abre en un nuevo pane.

```bash
zellij --layout compact
```

# Tabs

Rename: C-a ,

## Sync

Enviamos lo mismo a todos los panes del tab:
Control+t s

Si un pane está maximizado, solo enviamos a ese.

# Panes

Rename: C-a ;

Mover a nuevo tab: C-a !

Mover pane a otro tab: C-t []

Cerrar C-a x

Fullscreen C-a z

Cambiar ubicación de pane: Control+h <arrows>

Movernos entre panes
Alt+hjkl (o flechas).
Si no hay más pane saltará al siguiente tab.

## Size / arrange

<https://zellij.dev/tutorials/stacked-resize>

Podemos cambiar el tamaño de los panes: Alt+ / Alt-

Cambiar organizactión (vertical, horizontal, stacked): `alt [ / alt ]`

## Floating pane

Tendremos un floating pane por cada tab, serán independientes.

Floating pane, abrir un panel temporal: Alt+f
Para maximizarlo: Alt+]

Cambiar organizactión (base, staggered, enlarged, spread): `alt [ / alt ]`

Podemos "pinear" un floating pane para que se mantenga encima aunque vayamos a otro pane.
Podemos pinchar en "PIN" o Control p+i

Podemos moverlo pinchando y usando el ratón.

Podemos convertir un pane normal a floating con "embed".

# Sessions

Unirse a una sesión:

```bash
zellij attach NOMBRE
```

Session manager:
Control o+w
C-a s

Nos permite ver, por cada sesión, que tabs y panes tiene, y que comando hay corriendo en cada pane (si es el caso).

Control+d, cerrar todas las sesiones. O borrar todas las sesiones que se podían recuperar.

Control+r para renombrar una sesión

Entrar directamente al session manager:

```bash
zellij -l welcome
```

Podemos restaurar sesiones que se cerraron.

## Multiuser

Podemos tener varios "usuarios" (terminales) en la misma sesión.

El programa nos indicará donde está conectado cada uno, cada uno puede estar en un pane o tab distinto (aunque parece que cuando abro o me muevo a la floating y estamos en la misma pane, se le mueve a la floating).

# Plugins

<https://zellij.dev/documentation/plugins>

Control o+p

# TODO

Si hacemos resurrect de una sesión, se puede ver como estaba todo? En cada pane el resultado de la última ejecución y en el directorio que estábamos.
Por defecto parece que no se puede.

Puedo conectar dos ventanas a la misma sesión y cada una en una tab distinta?

Parece que el tiempo de respuesta dentro de zellij es un poco más lento.

Se puede buscar entre todas las panes y tabs? Y sessions?

Como seleccionar texto con el teclado? Como el copy mode de tmux.

Como copiar la línea actual (el comando que tengo escrito).

Como eliminar los bordes

Lo de restaurar y que arranque el último comando tiene algún bug. Si pongo un comando tipo `while true; do date; sleep 4; done`, cuando restaura lo que hace es ejecutar el comando `sleep 4`.

Cuando hago control+p se ve que hay más comandos hacia la derecha, pero no se como ver que más cosas hay.

Shortcut para ir a la última sesión activa.
