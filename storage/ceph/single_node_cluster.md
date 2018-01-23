Opciones que configurar si queremos un cluster de un solo nodo:

osd pool default size = 2
osd crush chooseleaf type = 0

Default pool size is how many replicas of our data we want.
Aqui entiendo que no tendríamos que poner 2 necesariamente.

The chooseleaf setting is required to tell ceph we are only a single node and that it’s OK to store the same copy of data on the same physical node. Normally for safety, ceph distributes the copies and won’t leave all your eggs in the same basket (server).
