Terminos genericos:
Volumen EBS: Disco persistente para usar con las instancias
EBS snapshot: Backup
AMI (Amazon Machine Image): imagen SO
Elastic IP: ips públicas estáticas reasignables sobre la marcha
ELB (Elastic Load Balancing): balanceador de carga
Grupos de seguridad: reglas del firewall. Por defecto los puertos cerrados hacia fuera y todos abiertos entre instancias
Spot instances: instancias workers mas baratas?
Auto Scaling: generar más instancias ante picos de carga
MarketPlace: software e imagenes de SOs listas para correr en AWS


Servicios de Amazon

Compute & Networking:
Direct connect: dedicated network connection to AWS
EC2: virtual servers (instances)
Elastic MapReduce: managed hadoop framework
Route 53: DNS escalable
VPC: usar AWS como nube privada a través de una VPN

Storage & Content Delivery:
Cloudfront: CDN
Glacier: archive storage in the cloud
S3: almacen de datos no estructurado con alta disponibilidad y durabilidad
Storage gateway: Integrates On-Premises IT Environments with Cloud Storage

Database:
DynamoDB: Store and query data items in a fully-managed, scalable, high performance non-relational data store.
SimpleDB: Store and query data items in a highly available and flexible non-relational data store.
Elastic cache: in-memory cache
RDS: base de datos relacionales administradas por amazon. mysql, pgsql, oracle, sqlserver
Redshift: Managed Petabyte-Scale Data Warehouse Service

Deployment & Management:
CloudFormation: Create and provision AWS infrastructure deployments predictably and repeatedly
Cloud Watch: monitorización
Data Pipeline: Automate the movement and transformation of data
Elastic Beanstalk: Quickly deploy and manage applications in the AWS cloud without worrying about the infrastructure that runs those applications.
IAM (Identity and Access Managment): varios perfiles de usuarios con distintos permisos
OpsWorks: DevOps Application Management Service

App Services:
CloudSearch: Managed Search Service
Elastic Transcoder: Easy-to-use Scalable Media Transcoding
SES: send email messages
SNS: Send and receive HTTP and email notifications from the cloud.
SQS: Create a queue and then send messages to, and receive them from, the queue.
SWF: Start, run, and retain workflow executions, as well as schedule tasks, add markers, receive signals, and start timers for those workflow executions.
