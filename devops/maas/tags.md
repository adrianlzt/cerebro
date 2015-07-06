https://maas.ubuntu.com/docs1.7/tags.html?highlight=tags

Hay que usarlas desde la CLI.
Tiene una pequeña web para ver nodos asociados a tags:
MAAS/tags/NOMBRE/view/

Listar tags:
maas root tags lis

Crear tag:
maas root tags new name='ndb' comment='MySQL NDB node'
{
    "comment": "MySQL NDB node", 
    "definition": "", 
    "resource_uri": "/MAAS/api/1.0/tags/ndb/", 
    "name": "ndb", 
    "kernel_opts": ""
}

Lista de nodos:
maas root nodes list

Asignar tag:
maas root tag update-nodes ndb add="node-13bad364-c5a3-11e4-9f63-5254009dc409"
{
    "removed": 0, 
    "added": 1
}



La relación en la base de datos se encuentra entre las tablas
maasserver_node
maasserver_tag
maasserver_node_tags
  esta última sirve para tener una relación M-N entre tags y nodos.
