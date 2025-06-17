<https://dunst-project.org/>
<https://github.com/dunst-project/dunst/blob/master/docs/dunst.pod>

mirar x11/notificaciones.md

Notificador
Nos pinta las notificaciones pasadas por DBus
Pemite ejecutar acciones sobre ellas, etc

dunstify es una mejora sobre notify-send con más opciones:
dunstify -a pruebaapp "summary text" "body text"

dunstify -a app -h int:nombre:2 -A action,YES -A other,NO pepe
  Nos abre un menú para seleccionar entre opciones
  si el usuario elige "YES", dunstify nos devolverá la cadena "action"

Para la urgencia:
-u 0/1/2

Pausar notifications:
dunstctl set-paused true

Volver a notificar:
dunstctl set-paused false

Alt+shift+n -> historial de notificaciones
alt+n ->  cerrar última notificación
alt+control+n -> cerrar todas las notificaciones
control+shift+. -> ejecutar acción de la notificación o abrir rofi para elegir opción

# Config

Ejemplo configuración: <https://github.com/dunst-project/dunst/blob/3f3082efb3724dcd369de78dc94d41190d089acf/dunstrc#L237>

Recargar la config:

```bash
dunstctl reload
```

# Customizar

<https://dunst-project.org/documentation/#RULES>

Se pueden customizar las notificaciones según su contenido

Messages can be matched by
   appname (discouraged, see desktop_entry)
   body
   category
   desktop_entry
   icon
   match_transient
   msg_urgency
   stack_tag
   summary

And you can override the
   background
   foreground
   format
   frame_color
   fullscreen
   new_icon
   set_stack_tag
   set_transient
   timeout
   urgency (aunque cambie el urgency, los colores no cambian, forzarlos también)

```
[skip-display]
    # This notification will not be displayed, but will be included in the history
    summary = "foobar"
    skip_display = yes

[ignore]
    # This notification will not be displayed
    summary = "foobar"
    format = ""
```

# Scripts

Se pueden ejecutar scripts en las notificaciones.
Por ejemplo, leer algunas importantes.
