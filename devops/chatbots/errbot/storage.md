Por defecto almacena ficheros gdbm en el directorio data/

Para ver el contenido (binario):
gdbm_dump ACLs.db

Leer el contenido:
errbot --storage-get skype



Obtener un storage para un backend:
from errbot.storage.shelf import ShelfStoragePlugin
ssp = ShelfStoragePlugin(self.bot_config)
self.storage = ssp.open("skype")
self.storage.set("clave", "valor")"clave", "valor")
self.storage.get("clave")


Listar claves:
for k in self._bot.storage.keys():
  print(k)
