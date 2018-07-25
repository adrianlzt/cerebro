Tener varias replicas no quiere decir que tengamos backup.
Si alguien borra datos no podremos recuperarlos.

Tal vez usar un "force merge" antes del backup para reducir el tamaño? Mirar internals.md
Tal vez tambien un flush y un sync flush?

Necesitamos un "repository": azure, s3, mount point, etc
No usar "read only url".


PUT _snapshot/my_repo
{
 "type": "fs",
 "settings": {
   "location": "/mnt/my_repo_folder",
   "compress": true,
   "max_restore_bytes_per_sec": "40mb",
   "max_snapshot_bytes_per_sec": "40mb"
 }
}


Para S3, Azure, etc necesitaremos plugin



Crear snapshot:
PUT _snapshot/my_repo/my_logs_snapshot_1
{
  "indices": "logs-*",
  "ignore_unavailable": true,  # si estan cerrados
  "include_global_state": true
}


Ver como va el snapshot:
GET _snapshot/my_repo/my_snapshot_2/_status

Esperar a que termine el snapshot
PUT _snapshot/my_repo/my_logs_snapshot_2?wait_for_completion=true
{  ...}

Si hacemos un snapshot (S1), borramos datos y hacemos otro snapshot (S2).
S1 tendrá los datos borrados, pero no S2.


Donde ejecutar el backup?
Tal vez un nodo que no tenga mucha carga.
Bajarle el throughput e ir haciendo unos pocos indices cada vez.



Info de los snapshots:
GET _snapshot/my_repo/_all
GET _snapshot/my_repo/my_snapshot_1

Borrar snapshot:
DELETE _snapshot/my_repo/my_snapshot_1


Restore:
POST _snapshot/my_repo/my_snapshot_2/_restore

Restore solo un indice:
POST _snapshot/my_repo/my_snapshot_2/_restore
{
 "indices": "logs-*",
 "ignore_unavailable": true,
 "include_global_state": false
}


Renombrar el nombre de un indice para no coincidir:
POST _snapshot/my_repo/my_snapshot_2/_restore
{
 "indices": "logs-*",
 "ignore_unavailable": true,
 "include_global_state": false,
 "rename_pattern": "logs-(.+)",
 "rename_replacement": "restored-logs-$1"
}


# Full backup
Lo más sencillo es crear un nuevo repository y hacer ahí el backup
Esto puede ser interesante si hemos ido borrando datos con curator y ya no queremos datos tan antiguos en el backup.

# Entre clusters
Se puede restaurar un snapshot en otro cluster (en otra localización por ejemplo)


# Como funcionan los snapshots
Son incrementales.
Se usan punteros para apuntar a segmentos que ya estaban almacenados en otros snapshots

Cuando se hace un merge de segmentos (partes internas de los shards), tenemos que copiar el nuevo segmento que se ha formado.

Cuando se hace un borrado de un snapshot, se tienen que resolver los punteros y copiar la información necesaria.

Por esto es dificil es conocer a priori el tamaño de un índice.
