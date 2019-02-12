https://github.com/dunst-project/dunst/blob/master/docs/dunst.pod

Notificador
Nos pinta las notificaciones pasadas por DBus
Pemite ejecutar acciones sobre ellas, etc

dunstify es una mejora sobre notify-send con más opciones:
dunstify -a app -h int:nombre:2 -A action,YES -A other,NO pepe
  si el usuario elige "YES", dunstify nos devolverá la cadena "action"

killall -SIGUSR1 dunst # pause
killall -SIGUSR2 dunst # resume


Alt+shift+n -> historial de notificaciones
alt+n ->  cerrar última notificación
alt+control+n -> cerrar todas las notificaciones
control+shift+. -> ejecutar acción de la notificación o abrir rofi para elegir opción


# Customizar
Se pueden customizar las notificaciones según su contenido

# Scripts
Se pueden ejecutar scripts en las notificaciones.
Por ejemplo, leer algunas importantes.
