Hay que diferenciar entre herramientas de AWS y herramientas para EC2.

Con pip (python):
pip install awscli

Configuración  http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
aws configure
Default region name [None]: eu-west-1
Default output format [None]: json
  Tambien puede ser table o text. Se puede cambiar con el parámetro: --output TIPO

Crea el fichero ~/.aws/config

Configurar el autocompletado:
complete -C aws_completer aws


Ayuda con:
aws help
aws ec2 help
aws ec2 describe-instances help

Más info en awscli.md



Existen paquetes de Ubuntu para cada servicio de AWS:
ascli - Amazon Autoscaling Tools
moncli - Amazon CloudWatch Tools
ec2-ami-tools - Herramientas Amazon EC2 AMI
ec2-api-tools - Herramientas de la API Amazon EC2
elasticache - Herramientas de Amazon ElastiCache
elbcli - Amazon Elastic Load Balancing tools
jets3t - graphical and command-line tools for Amazon S3 and CloudFront
rdscli - Amazon EC2 Relational Database Service tools
s3cmd - command-line Amazon S3 client


Últimas versiones para Ubuntu:
Up to date versions of several tools from AWS.
Use this repository by:
sudo apt-add-repository ppa:awstools-dev/awstools
sudo apt-get update
sudo apt-get install ec2-api-tools



http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html

Esto es distinto de las ec2 api tools



sudo apt-get install ec2-api-tools


Herramientas de autoscaling: http://aws.amazon.com/developertools/2535

Hay que configurar muchas variables de entorno para que esto funcione.
