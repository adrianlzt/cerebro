Acceder a un set de ficheros desde dos puntos distintos

Crear un directorio como si fuese un enlace duro:
mount -t none -o bind /dir/origen /dir/destino

El /dir/destino debe existir


Si queremos acceder a dos sets de ficheros desde un único punto mirar unionfs o aufs
