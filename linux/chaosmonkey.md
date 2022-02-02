https://github.com/dastergon/awesome-chaos-engineering

# Chaos mesh
A Powerful Chaos Engineering Platform for Kubernetes
https://chaos-mesh.org/

# Chaosmonkey
Script para "liarla" en tu entorno para ver que está bien montado y resistente.
Tools for keeping your cloud operating in top form. Chaos Monkey is a resiliency tool that helps applications tolerate random instance failures.

Ejemplos:
https://github.com/Netflix/SimianArmy
https://github.com/Netflix/SimianArmy/tree/master/src/main/java/com/netflix/simianarmy/chaos
https://github.com/jpetazzo/orchestration-workshop/blob/master/bin/chaosmonkey.sh


Herramientas para testear distintas capas:
Game Days -> testear como actua la gente
Simian Army -> testear fallos en las apps. Chaos monkey, borra VMs de manera aleatoria.
FIT -> failure injection testing. Inyectar fallos particulares sobre alguna app para ver que sucede
ChAP -> simular errores en la capa de switching entre datacenters
Gremlin: automatizar todos las apps de chaos. Deja un registro de lo que se ha hecho y tiene un boton de "control+z" para deshacer el chaos


# Charla Madrid DevOps / Chaos Architecture
Cada mes paran uno de los datacenters para ver que todo sigue funcionando correctamente.
También cada mes (o algo más) para una zona entera.
Con esto quieren probar que si se cae alguna de las zonas o datacenter todo sigue funcionando correctamente.

Free ebook: oreilly "chaos engineering"


Forzar errores para simular como se actuaría en casos reales.
Es como cuando se simula una alarma de incendio. Cuando la gente lo ha hecho varias veces conoce que debe hacer y como actuar.

Lo primero es formar a los empleados.
Simular outages y ver como se actuaría.
Luego ir bajando por las capas, testeando que pasa si las rompemos: application, switching, infrastructure

Lo típico es usar chaos monkey cuando estamos desarrollando una aplicación.
Abrimos una cuenta en AWS y lo primero que instalamos es el chaos monkey.
Lo configuramos para correr todos los días en la cuenta de test y una vez por mes en la cuenta de producción.
Se debe empezar a hacer la app/switching/infrastructure resistente desde el principio.

Suele ser más importante ser "available" que "consistency" (hablando de CAP)



Red Team: equipo que intenta atacar el sistema.
Safestack, AVA, Metasploit, Nmap, AttackIQ, SafeBreach
Este equipo tambien debe formar a los empleados, intentando engañarlos y luego mostrarles que no deberian haber hecho eso.
Por ejemplo, enviar emails de phishing a los empleados y avisar al que lo pinche.
