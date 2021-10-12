mirar root.md

# termux desde adb
https://github.com/termux/termux-app/issues/77

para acceder desde adb shelll
export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib



# obtener posición
instlar termux-api
pkg add termux-api (creo que era así)

/data/data/com.termux/files/usr/libexec/termux-api Location

Acceso a la localización
https://android.stackexchange.com/a/220278
instalar Termux-API
termux-location


# ssh
https://wiki.termux.com/wiki/Remote_Access
id en termux para obtener el username


# https://github.com/cswl/tsu
para saltar desde adb a termux
he tenido que cambia "env" por "/system/bin/env"
