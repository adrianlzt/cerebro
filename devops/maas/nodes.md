Mirar add-nodes.md


Delete
  Deja el nodo como está pero lo saca de la base de datos de MAAS

Stop
  Apaga la máquina

Start
  Arranca la máquina. Se le pasará un boot from disk al netboot para que arranque de lo que tenga instalado en disco

Release
  Apaga la máquina y quita la propiedad al usuario que la tuviera

Acquire and start node
  Nos asignamos el nodo, lo arrancamos e instalamos el SO definido
  Si tras un release ejecutamos de nuevo esta acción volverá a instalar el SO


Forma de reutilizar un nodo:
Release + Acquire and start
