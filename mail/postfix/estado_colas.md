http://linux.die.net/man/1/mailq.postfix

mailq

Despues del Queue ID pueden pasar varias cosas:
  - no venir nada -> email que se está intentando enviar
  - * -> mensaje en la cola activa
  - ! -> mensaje en la cola hold, no se reintentara enviar a no ser que se cambie el estado a mano


Contenido de un mensaje:
postcat -vq QUEUE_ID
