Como el apache de las llamadas.

Si queremos una UI (php): freepbx

Apps de softphone (para instalar en el móvil o pc para llamar o recibir llamadas):
Acrobits Softphone (6.5€, android / ios)
zoiper para linux
  quitar STUN en la config de la cuenta
linphone (android, también tiene appimage para linux, pero no me funciona, no conecta)
jami, no me conecta, no he mirado mucho

Hello world:
https://wiki.asterisk.org/wiki/display/AST/Hello+World

# Configuración
Relaciones entre los distintos tipos de objeto de configuración
https://wiki.asterisk.org/wiki/display/AST/PJSIP+Configuration+Sections+and+Relationships#PJSIPConfigurationSectionsandRelationships-RelationshipsofConfigurationObjectsinpjsip.conf

Usaremos pjsip (sip está deprecated).
Podemos usar "pjsip reload" para recargar la config de pjsip.

## Transport
Transport es el protocolo que tendremos para que se comunique pjsip.
Podría ser udp, tcp, tls, etc.

Para escuchar en el puerto UDP/5060 pondremos
```
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0
```

pjsip show transports

Una vez tenemos el transport, tenemos que crear una config para cada teléfono que queremos conectar.
Para cada teléfono tendremos que configurar endpoint, auth y AOR.

En realidad es más sencillo usar pjsip_config_wizard, que incluye todo en un solo objeto.
Mirar después de la explicación de cada una de las partes.


## Endpoints
Podemos verlo como las entidades a las que queremos conectar. En este objeto se enlazarán otras partes de la configuración.

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

Otro ejemplo, usando palabras en vez de números, para que sea más descriptivo:
```
[pepe]
type=endpoint
context=from-internal
disallow=all
allow=ulaw
auth=pepe_auth
aors=pepe

[pepe_auth]
type=auth
auth_type=userpass
username=pepe
password=foobar

[pepe]
type=aor
max_contacts=1
```

## Auth
Es donde se almacena como se identifica la entity.
Desde el endpoint debemos apuntar al auth que queremos usar.

## AOR
https://wiki.asterisk.org/wiki/display/AST/PJSIP+Configuration+Sections+and+Relationships#:~:text=EXAMPLE%20BASIC%20CONFIGURATION-,AOR,-(provided%20by%20module

Donde podemos contactar a tal identity. Por ejemplo, un endpoint apunta a un AOR y en ese AOR se dice que para contactar tenemos que ir a la IP 1.2.3.4.

A primary feature of AOR objects (Address of Record) is to tell Asterisk where an endpoint can be contacted. Without an associated AOR section, an endpoint cannot be contacted

The name of the AOR section must match the user portion of the SIP URI in the "To:" header of the inbound SIP registration. That will usually be the "user name" set in your hard or soft phones configuration.

## Wizard
https://wiki.asterisk.org/wiki/display/AST/Asterisk+19+Configuration_res_pjsip_config_wizard

Nos permite crear un endpoint, auth, AOR y dialplan en un solo objeto:
```
[pepe]
type = wizard
accepts_auth = yes
accepts_registrations = yes
aor/max_contacts = 1
has_phoneprov = yes
transport = ipv4
has_hint = yes
hint_exten = 1000
inbound_auth/username = pepe
inbound_auth/password = foobar123
endpoint/allow = ulaw
endpoint/context = default
;phoneprov/MAC = 001122aa4455
;phoneprov/PROFILE = profile1
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

Llamar usando un nombre
```
exten => pepe,1,Dial(PJSIP/pepe)
exten => pepe,n,Hangup
```

### Application
https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+Application_Page
Llamar a varias personas al mismo tiempo.
Al llamar a "pepe" estaremos llamando a la vez a pepe_casa y pepe_movil.
```
exten => pepe,1,Page(PJSIP/pepe_casa&PJSIP/pepe_movil)
exten => pepe,n,Hangup
```

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

## ayuda
core show help ...

## restart
core restart now

## pjsip
pjsip reload

## dialplan
dialplan show
dialplan reload



## mostrar usuarios (pjsip)
pjsip show aors
Si están conectados mostrarán un "contact"

Mostrar solo usuarios conectados:
pjsip show contacts


# Troubleshooting
https://wiki.asterisk.org/wiki/display/AST/Asterisk+PJSIP+Troubleshooting+Guide

core set verbose 4
core set debug 4
pjsip set logger on
