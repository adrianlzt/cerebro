5672 es el puerto principal, el que usan los clientes.

Si tenemos un cluster, ellos se comunicaran preguntando a epmd (erlan port mapper daemon, puerto 4369). Este servicio les dirá en que pueto se encuentra el puerto de rabbitmq destinado al cluster:

$ epmd -names
epmd: up and running on port 4369 with data:
name rabbitmqctl20351 at port 48789
name rabbitmqctl15704 at port 57122
name rabbit at port 35672


Por lo tanto los nodos del cluster entre si hablan por el puerto 35672


El puerto 15672 es para la consola de management
