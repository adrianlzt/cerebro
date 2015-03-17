https://maas.ubuntu.com/docs1.7/tags.html?highlight=tags

Hay que usarlas desde la CLI.

Crear tag:
# maas root tags new name='ndb' comment='MySQL NDB node'
{
    "comment": "MySQL NDB node", 
    "definition": "", 
    "resource_uri": "/MAAS/api/1.0/tags/ndb/", 
    "name": "ndb", 
    "kernel_opts": ""
}


Asignar tag:
# maas root tag update-nodes ndb add="node-13bad364-c5a3-11e4-9f63-5254009dc409"
{
    "removed": 0, 
    "added": 1
}

