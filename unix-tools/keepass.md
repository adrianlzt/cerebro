kpcli version cli para keepass (perl)

Para escritorio usar keepassx


# Python
## pykeepass
https://github.com/pschmitt/pykeepass

from pykeepass import PyKeePass
kp = PyKeePass("file.kdbx", password="pass")
kp.entries
  array de todas las entradas
  el path lo pone de forma un tanto extraña:
  'Usuarios/NagiosqlPro/Pro/ICINGA/None'
  kp.entries[290].path
  'Infraestructura/Pro/Splunk/splunkphsearch02/SPLUNK5'
  Esto por ejemplo esta en "Splunk/Pro/Infraestructura/" nombre "splunkphsearch02/SPLUNK5"


## libkeepass
pip install libkeepass

import libkeepass


>>> import libkeepass
>>> with libkeepass.open("file.kdbx", password="pass") as k:
...   kdb = k
>>> a = kdb.pretty_print()
>>> with open("output", "w") as out:
...   out.write(a)

Con esto conseguimos un dump en xml de la base de datos

kdb.obj_root devuelve un objeto lxml para navegar por el fichero.

Mirar el XML para saber como navegar por el
kdb.obj_root.Root.Group.Name
Nombre del grupo (en el caso que miro solo hay uno)

Si tenemos varios directorios (Groups)
kdb.obj_root.Root.Group.Group[1].Name


>>> kdb.obj_root.Root.Group.Group[0].Group[0].Group[0].Entry[0].String[2].Key
'Title'
>>> kdb.obj_root.Root.Group.Group[0].Group[0].Group[0].Entry[0].String[2].Value
'valor del titulo'


# Buscar
>>> kdb.obj_root.xpath('.//Value[text()="mysql"]')[0].getparent().getparent().xpath('.//Key[text()="Password"]')[0].getparent().Value
'password'

Desde root, busca un elemento <Value> que tenga el texto "mysql".
De ahí sube dos niveles para llegar al nivel de Entry.
En la entry busca la <Key> que se llame, password, y sube un nivel para obtener el valor, que es la contraseña.

