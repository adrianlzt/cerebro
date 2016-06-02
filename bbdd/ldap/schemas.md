Cuando creamos una entrada los campos que pueden definirse están definidos por el schema que estemos usando.
Este esquema se define con objectClass.

Se pueden definir varios objectClass para una misma entrada.
Por ejemplo, para un user:
objectClass: top
objectClass: person
objectClass: organizationalperson
objectClass: inetOrgPerson
objectClass: ntUser
objectClass: inetUser
objectClass: posixAccount


Cada una de estas clases nos permite meter ciertos campos.

inetUser por ejemplo provee:
inetUserHttpURL
inetUserStatus
memeberOf
uid
UserPassword


# 389ds
En 389ds la consola de admin permite ver la definición de cada schema

El fichero donde se define:
/etc/dirsrv/schema/20subscriber.ldif
objectClasses: ( 2.16.840.1.113730.3.2.130 NAME 'inetUser' DESC 'Auxiliary class which must be present in an entry for delivery of subscribe
r services' SUP top AUXILIARY MAY ( uid $ inetUserStatus $ inetUserHTTPURL $ userPassword $ memberOf ) X-ORIGIN 'Netscape subscriber interop
erability' )


## Schemas
https://access.redhat.com/documentation/en-US/Red_Hat_Directory_Server/8.2/html/Administration_Guide/Managing_Attributes.html#Managing_Attributes-Viewing_Attributes
