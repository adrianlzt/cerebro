https://stackoverflow.com/a/32791079/1407722

Para hacer una syscall en 32 bits (compatible con 64) es con:
int 0x80

Pero en 64bits lo recomendado es:
SYSCALL



Si queremos llamar a una syscall tendremos que pasar unos determinados parámetros.
Aquí tenemos una tablas con las syscall disponibles y los parámetros:
http://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/
