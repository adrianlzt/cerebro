Podemos lanzar queries de almacenamiento que sean conscientes de como va su indexación:

false: the default value, any changes to the document are not visible immediately
true: forces a refresh in the affected primary and replica shards so that the changes are visible immediately (no recomendable, estamos forzando ES fuera de lo que él quiere)
wait_for: synchronous request that waits for a refresh to happen (esto pide a ES que indexe lo antes posible, pero sin impactar negativamente)

PUT my_index/doc/102/?refresh=wait_for
{
 "firstname" : "James",
 "lastname" : "Brown",
 "address" : "6011 Downtown Lane",
 "city" : "Detroit"
}
