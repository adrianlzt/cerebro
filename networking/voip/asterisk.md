Como el apache de las llamadas.

Artículos que parten desde explicar voip, instalar asterisk, configurarlo, etc
https://www.redhat.com/sysadmin/topics/voip

Si queremos una UI (php): freepbx

Hello world:
https://docs.asterisk.org/Getting-Started/Hello-World/

# Configuración
Relaciones entre los distintos tipos de objeto de configuración
https://wiki.asterisk.org/wiki/display/AST/PJSIP+Configuration+Sections+and+Relationships#PJSIPConfigurationSectionsandRelationships-RelationshipsofConfigurationObjectsinpjsip.conf

Usaremos pjsip (sip está deprecated).
Podemos usar este comando para recargar la config de pjsip.
pjsip reload

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
pjsip_wizard.conf

Para verlas en la consola:
pjsip show endpoints
Con más detalle:
pjsip show endpoint NOMBRE


Para crear un endpoint "6001" con usuario=6001 y password=6001:
```
[6001]
type=endpoint
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

En endpoints.conf tendremos que al menos crear el context default.
En pjsip.conf tendremos que crear el transport que hayamos usado aqui.

Si queremos poner parámetros para que vayan al objeto "endpoint" en el wizard, lo haremos con el prefijo "endpoint/", por ejemplo:
endpoint/direct_media = no


## NAT / direct media
https://docs.asterisk.org/Configuration/Channel-Drivers/SIP/Configuring-res_pjsip/Configuring-res_pjsip-to-work-through-NAT/#for-remote-phones-behind-nat

Si queremos que la comunicación de los softphones/extension se haga pasando por asterisk configuraremos el pjsip wizard con:
```
endpoint/direct_media = no
endpoint/rtp_symmetric = yes
endpoint/force_rport = yes
endpoint/rewrite_contact = yes
```

El direct_media lo que hace es evitar que los softphones intenten conectarse directamente.
Solo con eso lo que veo es que el dispositivo que llama no es capaz de llevar su audio al destinatario.
Ejemplo, A llama a B. A envía el audio RTP a asterisk, pero luego asterisk lo envía a la ip privada de B (está NATeado), por lo que no funciona.
Parece que las otras 3 opciones arreglan ese problema.

rtp_symmetric: Enforce that RTP must be symmetric. Send RTP back to the same address/port we received it from.
force_rport: Force RFC3581 compliant behavior even when no rport parameter exists. Basically always send SIP responses back to the same port we received SIP requests from.
direct_media: Determines whether media may flow directly between endpoints.
rewrite_contact: Determine whether SIP requests will be sent to the source IP address and port, instead of the address provided by the endpoint.



Otra opción serían clientes que soporten ICE,STUN,TURN.
No lo he mirado aún.
https://docs.asterisk.org/Configuration/Channel-Drivers/SIP/Configuring-res_pjsip/Configuring-res_pjsip-to-work-through-NAT/#clients-supporting-icestunturn


## Dialplan / Extensiones
https://www.redhat.com/sysadmin/asterisk-dialplan

https://wiki.asterisk.org/wiki/display/AST/Dialplan
Lenguage de scripting para decirle a asterisk que debe hacer.

Podemos escribir el dialplan en LUA
https://wiki.asterisk.org/wiki/display/AST/Lua+Dialplan+Configuration

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

Podemos llamar a varias extensiones al mismo tiempo y el que primero coja se queda la llamada:
Dial(foo/bar&foo/bar2&foo/bar3)


### Application
https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+Application_Page
Llamar a varias personas al mismo tiempo.
Al llamar a "pepe" estaremos llamando a la vez a pepe_casa y pepe_movil.
```
exten => pepe,1,Page(PJSIP/pepe_casa&PJSIP/pepe_movil)
exten => pepe,n,Hangup
```

CUIDADO! Si usamos "Page", el que llama verá que la llamada se coje automáticamente, pero tal vez no hay nadie para contestar.
Usar Dial si lo que queremos es que coja alguien de una lista


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

Borrar registors AORs (borra todo)
https://community.asterisk.org/t/clearing-unavailable-pjsip-registrations/82469
database deltree registrar/contact


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


# Hints
https://wiki.asterisk.org/wiki/display/AST/Extension+State+and+Hints

Para conocer el estado de una extensión.

core show hints

# Troubleshooting / debug
https://wiki.asterisk.org/wiki/display/AST/Asterisk+PJSIP+Troubleshooting+Guide

core set verbose 4
core set debug 4
pjsip set logger on
  trazas de señalizacioń SIP (protocolo similar a HTTP)
rtp set debug on
  para ver como navegan los paquetes RTP cuando pasan por asterisk (si es que así lo tenemos configurado con direct_media=no) Podemos ver de donde vienen y a donde se envían.

## Borrar contactos asociados a un AOR
Esto nos puede suceder cuando un teléfono ha creado automáticamente el contacto y por lo que sea luego cambia algo y no puede volver a registrarse.
Veremos el error:
res_pjsip_registrar.c:769 register_aor_core: Registration attempt from endpoint 'pepe' (192.168.1.82:56948) to AOR 'pepe' will exceed max contacts of 1

Encontrar el contacto en la db:
database show

Borrarlo:
database del registrar/contact 101;@949152fdbe7da2c56519bf9b4985c047


# ASR / TTS
Cosas que tal vez sean interesantes

https://github.com/asterisk/aeap-speech-to-text
  para comunicar asterisk via websockets con una tercera app

https://github.com/Tinkoff/asterisk-voicekit-modules/tree/master


# Firewall
https://www.voip-info.org/asterisk-firewall-rules/
Para SIP entrada en el 5060 tcp y udp.
    firewall-cmd --zone=external --add-service=sip (esto permite tcp y udp?)
Si queremos filtrar por ip origen:
    firewall-cmd  --zone=external --add-rich-rule='rule family="ipv4" source address="92.184.97.64" port protocol="tcp" port="5060" accept'
    firewall-cmd  --zone=external --add-rich-rule='rule family="ipv4" source address="92.184.97.64" port protocol="udp" port="5060" accept'

Para RTP entrada udp 10000-20000
    firewall-cmd --zone=external --add-port=10000-20000/udp


# Python
mirar python/sip.md


# SIP trunking
Conectar con un proveedor para poder enrutar las llamadas a la red telefónica.
https://support.telnyx.com/en/articles/1130628-asterisk-configure-an-asterisk-ip-trunk

Ojo que la config del pjsip_wizard.conf tiene unas cosas mal (el "(!)" y el "(trunk_defaults)").

```
[trunk_defaults](!)
type = wizard

[telnyx](trunk_defaults)
endpoint/transport = 0.0.0.0-udp
```

Si no podemos llamar, comprobar los mensajes SIP intercambiados con telnyx.

Por ejemplo, tal vez tengamos que meter en la white list los paises a los que queremos llamar:
SIP/2.0 403 Dialed number +34666666666 (associated countries: ESP) is not included in whitelisted countries USA,CAN D13

Hay que añadir los paises en el outbound voice profile que tengamos asignado al SIP connection que estemos usando para conectar desde asterisk con telnyx.

También hace falta añadir el Caller ID Number (CID) correcto:
https://support.telnyx.com/en/articles/3546251-caller-id-number-policy
https://portal.telnyx.com/#/app/numbers/verified-numbers
