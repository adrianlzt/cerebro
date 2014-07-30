Almacen de preferencias de applicaciones:

Para ver todos:
gconftool-2 -R /

Para ver una configuración particular:
gconftool-2 --dump /apps/guake/keybindings/local

Dentro de ese xml del que hemos hecho dump veremos varias <entry>
Para obtener el valor de alguna:
gconftool-2 --get /apps/guake/keybindings/local/toggle_fullscreen


Para setar un valor deberemos decirle el --type int|bool|float|string
gconftool-2 --set /apps/guake/keybindings/global/show_hide --type string F1
