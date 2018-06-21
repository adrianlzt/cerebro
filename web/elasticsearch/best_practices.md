Index alias, por si reindexamos poder seguir usando el mismo nombre del índice.
  lo mejor es poner un alias a los índices que vayamos a usar e ir apuntando con aliases a los indices que vayamos usando.
  De esta manera es facil andar cambiando el indice, remapping, etc sin tocar la app.

Index templates: precrear templates para los indices que apareceran

Bulk: usar la api _bulk (en conjuntos de 50-150 docs por bulk)

Mget: para realizar varios GET al mismo tiempo

Scroll: para cuando tenemos que sacar large results sets

Backup
