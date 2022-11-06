Como el apache de las llamadas.

Artículos que parten desde explicar voip, instalar asterisk, configurarlo, etc
https://www.redhat.com/sysadmin/topics/voip

Si queremos una UI (php): freepbx

Apps de softphone (para instalar en el móvil o pc para llamar o recibir llamadas):
Acrobits Softphone (6.5€, android / ios)
zoiper para linux
  quitar STUN en la config de la cuenta
linphone (android, también tiene appimage para linux, pero no me funciona, no conecta)
jami, no me conecta, no he mirado mucho
blink, linux windows mac: https://icanblink.com/

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

https://wiki.asterisk.org/wiki/display/AST/PJSIP+Transport+Selection#:~:text=Best%20Configuration%20Strategies-,IPv4%20Only%20(Single%20Interface),-Configure%20a%20wildcard

Para escuchar en el puerto UDP/5060 pondremos
```
[udp]
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
https://wiki.asterisk.org/wiki/display/AST/PJSIP+Configuration+Wizard

Nos permite crear un endpoint, auth, AOR y dialplan en un solo objeto.
Si lo juntamos con templates, simplificamos la creación
https://wiki.asterisk.org/wiki/display/AST/PJSIP+Configuration+Wizard#:~:text=were%20created%20discretely.-,Full%20Examples%3A,-Phones%3A
```
[user_defaults](!)
type = wizard
accepts_auth = yes
accepts_registrations = yes
aor/max_contacts = 1
transport = udp
has_hint = yes
endpoint/allow = ulaw
endpoint/context = default

[pepe](user_defaults)
hint_exten = 1000
inbound_auth/username = pepe
inbound_auth/password = foobar123
```

En ednpoints.conf tendremos que al menos crear el context default.
En pjsip.conf tendremos que crear el transport que hayamos usado aqui.


## Dialplan / Extensiones
https://www.redhat.com/sysadmin/asterisk-dialplan

https://wiki.asterisk.org/wiki/display/AST/Dialplan
Lenguage de scripting para decirle a asterisk que debe hacer.

Mostrar lo que tenemos cargado:
dialplan show

Si solo modificamos el dialplan, podemos recargarlo con
dialplan reload

Conceptos:
Contexts: las distinta secciones en las que se divide el dialplan. Contienen una o más extensiónes
Extensions: conjunto de pasos que se ejecutan al llamar a un sitio
Priorities: los distintos pasos de una extensión, ordenan como se ejecutaran los pasos
Applications: que hacer en las pasos, por ejemplo, llamar, reproducir un sonido, etc

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



## chan_mobile / bluetooth
Conectando un móvil para sacar llamadas (chan_mobile)
https://jtanx.github.io/2016/02/24/using-asterisk-to-route-calls-through-mobile/

https://wiki.asterisk.org/wiki/display/AST/Using+chan_mobile

Si queremos ver los móviles disponibles:
mobile search
El campo "port" que ponga aquí deberá coincidir con el definido en el fichero de conf chan_mobile.conf


mobile show devices

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

Vemos que en el context ponemos "incoming-mobile", este será el contexto donde tendremos que definir que hacer con las llamadas entrantes.


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


Configurar que hacer con las llamadas entrantes:
```
[incoming-mobile]
exten => s,1,Noop(Accepting mobile call from ${DID})
exten => s,n,Page(PJSIP/pepe&PJSIP/maria)
```

Definimos la extensión "s" (start extension), que es donde llegan las llamadas analógicas.
Creamos una "llamada grupal" hacia pepe y maria. Es decir, todas las llamadas entrantes las reciben pepe y maria, y pueden contestarlas y hablar al mismo tiempo.




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



## mostrar datos pjsip
pjsip show endpoints
pjsip show aors
  aquí veremos que se asocia a un endpoint un contact donde tendremos la IP donde contactar con ese usuario
pjsip show contacts
pjsip show auths


# ARI / API REST
https://wiki.asterisk.org/wiki/display/AST/Asterisk+20+ARI

Tenemos que crear un usuario en ari.conf para poder usarlo.


# Call parking
https://wiki.asterisk.org/wiki/display/AST/Call+Parking

Nos permite poner una llamada "on hold" y cogerla en otro softphone.


# Periodic hook
https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+Function_PERIODIC_HOOK

Execute a periodic dialplan hook into the audio of a call.
For example, you could use this function to enable playing a periodic beep sound in a call.


# Troubleshooting
https://wiki.asterisk.org/wiki/display/AST/Asterisk+PJSIP+Troubleshooting+Guide

core set verbose 4
core set debug 4
pjsip set logger on

## Borrar contactos asociados a un AOR
Esto nos puede suceder cuando un teléfono ha creado automáticamente el contacto y por lo que sea luego cambia algo y no puede volver a registrarse.
Veremos el error:
res_pjsip_registrar.c:769 register_aor_core: Registration attempt from endpoint 'pepe' (192.168.1.82:56948) to AOR 'pepe' will exceed max contacts of 1

Encontrar el contacto en la db:
database show

Borrarlo:
database del registrar/contact 101;@949152fdbe7da2c56519bf9b4985c047
