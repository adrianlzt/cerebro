Lista de nodos:
GET _cat/nodes?v
GET _cat/nodes?help
  para ver todo lo que podemos sacar

Más info, JSON:
_nodes


GET _cat/nodes?v&h=name,node.role,heap.percent,cpu,load_1m,disk.used_percent,disk.avail,file_desc.percent&s=node.role
  mostrar consumo de cpu, heap, disco para los nodos e inodos, ordenados por tipo
