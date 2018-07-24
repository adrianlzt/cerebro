Index alias, por si reindexamos poder seguir usando el mismo nombre del índice.
  lo mejor es poner un alias a los índices que vayamos a usar e ir apuntando con aliases a los indices que vayamos usando.
    un alias para leer (que puede apuntar a varios índices) y otro para escribir (que irá rotando y solo puede apuntar a uno)
  De esta manera es facil andar cambiando el indice, remapping, etc sin tocar la app.
  Cuidado con definir demasiados campos para un documento

Index templates: precrear templates para los indices que apareceran

Bulk: usar la api _bulk (en conjuntos de 50-150 docs por bulk)

Mget: para realizar varios GET al mismo tiempo

Scroll: para cuando tenemos que sacar large results sets

Backup: mirar curator

Búsquedas, usar search templates para las búsquedas que se repitan por nuestro código.
