Whatsapp guarda un backup diario en google drive.

No se puede acceder de manera sencilla.

<https://github.com/m417z/WhatsApp-GD-Extractor-Multithread/>

Script en python para acceder.

Usando lo de <https://accounts.google.com/EmbeddedSetup> para obtener el oauth, la web no termina de cargar, pero la cookie ya está disponible.
Parece que solo me deja usarla una única vez con el script de python, por lo que si queremos hacer un "info" y luego un "sync" habrá que volver a loguearse.

Nos confirmará el número de teléfono asociado al backup y descargará un backup con los mensajes (crifrados) y los archivos multimedia.

Para descifrar los mensajes se puede usar
<https://github.com/KnugiHK/WhatsApp-Chat-Exporter.git>

Necesitaremos extraer la clave de cifrado de la base de datos de whatsapp
<https://github.com/EliteAndroidApps/WhatsApp-Key-DB-Extractor>

No probado el tema de la extracción de la clave de cifrado.
