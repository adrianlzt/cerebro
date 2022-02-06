Añadimos la interfaz y ponemos la MAC, poner como una udev.rule
```
iw phy phy0 interface add ap0 type __ap
ip link set ap0 address e4:5f:01:59:c8:0a
```

Para añadir el dev "ap0" también podemos usar:
```
iw dev wlan0 interface add ap0 type __ap
```

Para hacer esto persistente, meterlo en:
/etc/udev/rules.d/70-persistent-net.rules


iw dev
ver los devices conectado al device. Ahora veremos la wlan0 y ap0

nmcli dev s
Veremos el device "ap"

Al configurar la conex del ap (mirar wifi_ap.md) usar el mismo canal de la red wifi a donde nos queramos conectar.
Lo normal es que no puedan trabajar en varios canales distintos.
Lo podemos ver con "iw list" en "valid interface combinations"
```
#channels <= 1
```
