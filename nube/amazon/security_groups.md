The default security group does not allow ingress from anywhere other than your instances

Creo security group (descripción, -d, opcional):
ec2-create-group ec2tools-group -d "Grupo de seguridad para las maquinas manejadas con ec2 api tools"

Autorizo el puerto 22 de entrada para el grupo de seguridad que acabo de crear:
ec2-authorize ec2tools-group -p 22 -s 203.0.113.25/32
Para permitir desde cualquier sitio (equivalente a poner -s 0.0.0.0/0):
ec2-authorize ec2tools-group -p 22

