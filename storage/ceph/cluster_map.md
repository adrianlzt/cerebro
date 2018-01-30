http://docs.ceph.com/docs/master/architecture/#cluster-map

# Monitor Map
ceph mon dump


# OSD Map
ceph osd dump


# PG Map
ceph pg dump
  ver todos los PGs y a quien están mapeados
  tambien vemos la lista de OSDs y cuantos PG tiene cada uno

ceph pg map 1.6c
  obtener los OSDs donde está mapeado el PG "1.6c"


# CRUSH Map
ceph osd getcrushmap -o {filename}
crushtool -d {comp-crushmap-filename} -o {decomp-crushmap-filename}
less {decomp-crushmap-filename}


# MDS Map
Por si usamos CephFS, estos son los mapas de metadatos

ceph fs dump
