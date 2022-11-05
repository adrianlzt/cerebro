Como el apache de las llamadas.

Hello world:
https://wiki.asterisk.org/wiki/display/AST/Hello+World

# Configuración
Usaremos pjsip (sip está deprecated).

Para escuchar en el puerto UDP/5060 pondremos
```
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0
```

Para crear un usuario "6001" con usuario=6001 y password=6001:
```
[6001]
type=endpoint
context=from-internal
disallow=all
allow=ulaw
auth=6001
aors=6001

[6001]
type=auth
auth_type=userpass
password=6001
username=6001

[6001]
type=aor
max_contacts=1
```

## Dialplan / Extensiones
https://wiki.asterisk.org/wiki/display/AST/Dialplan
Lenguage de scripting para decirle a asterisk que debe hacer.

Si solo modificamos el dialplan, podemos recargarlo con
dialplan reload

Para crear un "número de teléfono" al que podemos llamar y que nos diga "hello world"
```
[from-internal]
exten = 100,1,Answer()
same = n,Wait(1)
same = n,Playback(hello-world)
same = n,Hangup()
```

La sintaxis de "exten" es:
exten => number,priority,application([parameter[,parameter2...]])

El número será el teléfono a donde llamamos.
Priority, el orden de ejecución (por si tenemos varios exten con el mismo número)
Y luego es la aplicación que ejecutar y sus parámetros.


### pattern matching / regex
https://wiki.asterisk.org/wiki/display/AST/Pattern+Matching

exten => _64XX
En este caso le estamos diciendo que queremos hacer match de las extensiones (números de teléfono) que empiezen por 64 y luego tengan dos dígitos.

exten => _9X.
Este sería cualquier número que empiece por 9 y tenga cualquier número de dígitos

## chan_mobile
Conectando un móvil para sacar llamadas (chan_mobile)
https://jtanx.github.io/2016/02/24/using-asterisk-to-route-calls-through-mobile/

https://wiki.asterisk.org/wiki/display/AST/Using+chan_mobile

Ejemplo configurando chan_mobile con la MAC del host y la MAC del móvil a usar:
```
[adapter]
id=blue
address=18:1B:46:A1:DF:67

[mimovil]
address=10:F4:18:79:71:9B
port=3                          ; the rfcomm port number (from mobile search)
context=incoming-mobile         ; dialplan context for incoming calls
adapter=blue                    ; adapter to use
group=1                         ; this phone is in channel group 1
```


Configurar el dialplan para enviar todas las llamadas al SIP por el móvil:
```
[from-internal]
exten => _X.,1,Dial(Mobile/adri/${EXTEN},45)
exten => _X.,n,Hangup
```

También podemos poner
```
[from-internal]
exten => _9X.,1,Dial(Mobile/adri/${EXTEN:1},45)
exten => _X.,n,Hangup
```
Así lo que le estamos diciendo al SIP es que si llamamos con un núeve delante queremos salir por el móvil.
El ${EXTEN:1} lo que hará es quitar ese primer 9.
Por lo que si llamamos al:
90034634231223
El móvil llamará al:
0034634231223




# Consola
asterisk -rvvvvv

Por aquí podemos ver los mensajes de error.

## restart
core restart now

## reload dialplan
dialplan reload
