Los usuarios pertenecen a grupos (User groups)
Los grupos tienen permisos: read/rw/deny/none sobre host groups

Cada host que creamos pertenece a uno o varios host groups.
Los hosts tienen items (alarmas).
Un conjunto de items forma una application.
Un template contiene un número de application y/o items (también puede tener triggers, maps, etc).
A un host podemos aplicarle uno o varios templates.

Notificaciones:
Un item hace saltar un trigger
Un action matchea ese trigger y envia un "Media Type" a un grupo/usuario. El action define que se envia en el mensaje, haciendo uso de macros para poner el nombre del host, fecha, etc.
El Media Type será un email, sms, etc


# Users
https://www.zabbix.com/documentation/3.4/manual/quickstart/login

Creando un usuario, con notificaciones, permissions, etc


# Items
mirar items.md



# Triggers
mirar triggers.md


# Config general
Almacenada en
select * from config;
