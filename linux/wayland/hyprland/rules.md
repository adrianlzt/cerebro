Podemos usar hyprprop para obtener los datos de una ventana.

Luego crear rules tipo:
```
windowrule {
    name = opensnitch-rules
    match:class = opensnitch_ui
    match:title = ^Rule$
    size = 800 400
    float = on
}

windowrule {
    name = open-files
    match:title = ^Open Files$
    size = monitor_w*0.7 monitor_h*0.7
    # size = 200 200
    float = on
}
```
