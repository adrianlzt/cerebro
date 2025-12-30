Acceder a un set de ficheros desde dos puntos distintos

Crear un directorio como si fuese un enlace duro:

```bash
mount -t none -o bind /dir/origen /dir/destino
```

Podemos usar "-o bind,ro" si no queremos que se puedan hacer escrituras en el /dir/destino.

El /dir/destino debe existir

CUIDADO! Usándolo para apuntar a una ansible-collection desde un directorio de ansible_collections, también teniendo git worktrees, alguna vez me encontré el directorio original vacío.

Tambien se puede hacer con ficheros.

Es como hacer enlaces duros pero entre distintos filesystems y/o directorios.

Si queremos acceder a dos sets de ficheros desde un único punto mirar unionfs o aufs
