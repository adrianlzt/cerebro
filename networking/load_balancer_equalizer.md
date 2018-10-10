https://docs.fortinet.com/uploaded/files/2537/AdminGuideV10.pdf

# Gestión de acceso
Generalmente usado mediante interfaz web.
También tiene conexion serie y ssh

En la consola:
> services ?


# Users
> show users

Crear user (nos preguntará la pass)
> user adrian
> user adrian flags admin


# SSH
Siempre acceder con eqadmin y luego ya poner el user/pass que usamos en la interfaz web

ssh eqadmin@blabla
User: XXX
Pass: XXX


# Maintenance mode
Si lo reiniciamos conectados a la consola serie, al arrancar nos da opciones para entrar en modo mantenimiento.
Tal vez en ese modo nos deje saltar al netbsd que hay por detrás.

# Debug mode
Si entramos por el puerto serie, cuando estamos con la pantalla que poner "username" damos a control+c

Si intentamos entrar a la shell, nos genera un codigo que tenemos que pasar al soporte de fortinet (http://kb.fortinet.com/kb/viewContent.do?externalId=FD34739) para que nos den la password de entrada

Si intentamos entrar con "login" y no podemos, parece que la cli se queda enganchada ahi y no nos deja volver al menu anterior (rebooteando podemos)


# SNMP
En la version 8.6 parece que no funciona SNMP.
He intentando arrancar el demonio a mano desde ssh pero es como si no tuviese la config donde debe. Queda por investigar más.
El SO es un FreeBSD 4

## MIBS
To download the MIBS use the following link:

http://<YOUR_COYOTE_IP_ADDRESS/eqmanual/<mibname>.my

where <mibname> can be in EQ/OS 10

* CPS-EQUALIZER-v10-MIB
* CPS-REGISTRATIONS-v10-MIB
* RFC1213-MIB
* HOST-RESOURCES-MIB

where <mibname> can be in EQ/OS 8.6

* cpsequal
* cpsreg
