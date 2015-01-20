Damos una votación de 50 para que el recurso 'resource' esté ejecutándose en el nodo 1.

# crm configure location prefer-node1 resource 50: node1

Hay que tener en cuenta el parámetro stickiness. Si ese valor está por encima de nuestra preferencia por movernos, el recurso se mantendrá alli. 
Si tenemos tres nodos con potencias distintas, podemos querer que si el recurso se ha movido al nodo pequeño, pueda saltar al grande, pero no al mediano. Pero el mediano tendrá mayor preferencia si el grande se cae.

Ejemplo:
nodo-pequeño	preferencia: 30
nodo-mediano	preferencia: 60
nodo-grande	preferencia: 100
Stickiness: 70

Si solo tenemos dos nodos cualquier voto por encima de 0 nos servirá.

Para ver las puntuaciones podemos utilizar la herramienta (instalada?):
ptest -sL
