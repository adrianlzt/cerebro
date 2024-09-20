Mirar tools.md
Herramienta awscli de python, mucho mejor.


Ubuntu:
ec2-ami-tools - Herramientas Amazon EC2 AMI: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SettingUp_CommandLine.html
ec2-api-tools - Herramientas de la API Amazon EC2

Estan ya incluídas en las AMIs Amazon Linux

## SetUp
~/.bashrc
export AWS_ACCESS_KEY=your-aws-access-key-id
export AWS_SECRET_KEY=your-aws-secret-key

$ source ~/.bashrc

Para probar que hemos configurado bien y tenemos acceso, ejecutar:
ec2-describe-regions

Podremos meter uno de esos endpoints (la URL) para cambiar de región:
export EC2_URL=https://<service_endpoint> 


## Arrancando una instancia (para VPC cambia un poco): http://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/ec2-cli-launch-instance.html
Creo el keypair (la primera linea, que no cogemos, es el fingerprint de la clave privada):
ec2-create-keypair ec2tools | tail -n +2 > ec2tools.pem
chmod 400 ec2tools.pem

Creo security group (descripción, -d, opcional):
ec2-create-group ec2tools-group -d "Grupo de seguridad para las maquinas manejadas con ec2 api tools"

Autorizo el puerto 22 de entrada para el grupo de seguridad que acabo de crear:
ec2-authorize ec2tools-group -p 22 -s 203.0.113.25/32
Para permitir desde cualquier sitio (equivalente a poner -s 0.0.0.0/0):
ec2-authorize ec2tools-group -p 22

Arranco una instancia con el grupo y keypair creados.
  La ami es amazon linux USA Virginia.
  t1.micro es la que entra dentro del pack gratuito
ec2-run-instances ami-35792c5c -t t1.micro -k ec2tools -g ec2tools-group

Para ver el estado de las instancias arrancadas en esa AV:
ec2-describe-instances / ec2din

De ese comando deberemos obtener la ip externa para poder conectarnos (el usuario ec2-user es el que viene en Amazon Linux):
ssh -i ec2tools.pem ec2-user@ec2-54-226-222-201.compute-1.amazonaws.com

Lista de comandos: http://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/OperationList-cmd.html


### Comandos ###

# Grupos
Crear
ec2-create-group ec2tools-group -d "Grupo de seguridad para las maquinas manejadas con ec2 api tools"

Mostrar
ec2-describe-group

Borrar
ec2-delete-group


# Instancia
ec2-describe-instance-attribute
ec2-describe-instance-status / ec2dins
ec2-describe-instances / ec2din
ec2-get-console-output
ec2-get-password
ec2-modify-instance-attribute
ec2-reboot-instances
ec2-reset-instance-attribute
ec2-run-instances
ec2-start-instances
ec2-stop-instances
ec2-terminate-instances / ec2kill


### OLD ###
http://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/ApiReference-cmd-GetConsoleOutput.html
ec2-get-console-output == ec2gcons
Para controlar las máquinas. Sería como la consola local de la máquina.

http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Stop_Start.html


