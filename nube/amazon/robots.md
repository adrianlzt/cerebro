https://aws.amazon.com/es/lex/?sc_channel=em&sc_campaign=Launch_2016_reInvent_recap1&sc_publisher=aws&sc_medium=em_26484&sc_content=launch_la_tier1&sc_country=global&sc_geo=global&sc_outcome=launch&trk=em_26484&mkt_tok=eyJpIjoiTURnek9UVm1OemN6TkdNNCIsInQiOiJNRmp0eGluNThGUitHWmU0MlwvS1k0Uk1Na3cwaUtNcDlwK0l2RXpwbEZCRGFlc0doQ1plXC8yV0pMb2pjSVRCaklQTlVDZDVyVVFnUlhjSjhcL3R2TzA5dnJPcGNTOUlDaDRwQmRIZFQrMHl4WT0ifQ%3D%3D

Conversational interfaces for your applications
Powered by the same deep learning technologies as Alexa


# Montar Alexa en Linux
https://github.com/alexa/alexa-avs-sample-app/wiki/Linux

Hay que registrarse como developer de amazon

Nos creamos un "Security Profile" para alexa: claves para acceder a la api
https://developer.amazon.com/edw/home.html#/
https://github.com/alexa/alexa-avs-sample-app/wiki/Create-Security-Profile

Apuntamos el profile id, client id y client secret

Añadimos las webs validas de localhost:3000 como indica el manual

Clonamos este repo:
git clone https://github.com/alexa/alexa-avs-sample-app.git



# Añadir skills
https://www.amazon.co.uk/alexa-skills/b/ref=topnav_storetab_a2s?ie=UTF8&node=10068517031
Es una tienda de skills. Simplemente tendremos que activarlo.

Llamar a un skill:
Alexa Open Nombre Skill
Alexa Ask Nombre Skill For Un intent del skill
Alexa Ask Nombre Skill To Un intent del skill
Alexa Ask Nombre Skill Un intent del skill

Si el skill es conversacional y deja la sesión abierta luego podremos hablar directamente, sin decir "alexa ..."


# Crear skills
https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/getting-started-guide
Para testear skills: https://echosim.io

Añadir en el store de amazon el nuevo skill para que se puede usar por alexa: https://developer.amazon.com/edw/home.html#/skills/list
Ejemplo de intent schema: alexa_skill_example_intent_schema.json
Ejemplo de utterances (voces, hablas): alexa_skill_sample_utterances.txt

Parece que se pueden mantener privados dejándolos como "testing" https://www.reddit.com/r/amazonecho/comments/4cujdj/can_i_make_my_alexa_skill_private/


You define the requests the skill can handle (intents) and the words users say to invoke those requests (utterances).

Hay tres tipos de skills:
 - custom: se envia una petición a un web service
 - home: para interaccionar con luces, equipos de sonido, etc
 - flash briefing: obtiene datos de un feed y es lo que contesta al usuario


Ejemplos para nodejs: https://github.com/amzn/alexa-skills-kit-js.git

Desarrollo con python y flask: https://developer.amazon.com/blogs/post/Tx14R0IYYGH3SKT/Flask-Ask-A-New-Python-Framework-for-Rapid-Alexa-Skills-Kit-Development
mirar alexa_skills_python.md


Cuando hablamos con amazon apuntando a nuestro skill, amazon envia al web service un json varios datos, entre ellos el userId, applicationId, sessionID y el tipo de request, por ejemplo "LaunchRequest" (que parece que es para que arranque el skill).
El web service contestará con otro json con un texto para reproducir, diciendo si debe terminarse la sessión y datos de la sessión en marcha. 


# Habla
https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference

Se pueden usar etiquetas SSML para definir como debe hablar alexa.
Por ejemplo, pasarle un número para que lo lea como "mil novecientos...", como una fracción, que diga una fecha, hora, teléfonos, etc
O que deletree algo.
Que reproduzca un mp3
Meter pausas
Reproducir cosas según el alfabeto fonético internacional: <phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan</phoneme>
Convertir texto español a su transcripción fonética: http://www.aucel.com/pln/transbase.html


# Slots
Los tipos de cosas que puede decir el usuario.

Hay muchos predefinidos aqui: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference

Si queremos hacer uno custom tendremos que pasar una lista de los posibles valores para ese slot.
https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/implementing-the-built-in-intents#Available%20Built-in%20Intents
