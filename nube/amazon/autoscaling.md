Chuleta de amazon: http://awsdocs.s3.amazonaws.com/AutoScaling/latest/as-qrc.pdf
EC2 tools: http://aws.amazon.com/developertools/2535
Hay que configurarlas con variables de entorno
Vector: predictive scaling, and flexible down scaling

Se definen unos grupos de autoscaling.
Las máquinas de estos grupos deben ser sin estado.

Lo lógico es que todas estas máquinas estén por debajo de un balanceador de carga.

Se definen unas políticas para estos grupos.

El autoscaling se puede hacer de dos formas:
-Por scheduling

-Manual

-Por demanda (basado en métricas de cloudwatch, puedes crear métricas custom). Tienes que conocer tu sistema para saber cuando tu sistema se está necesitando escalar (por memoria, capacidad, número de conexiones, múltiples variables...)

Ejemplo de carga:
If Aggregated(CPU_Usage) > 60% => Launch new instance
If Aggregated(CPU_Usage) < 30% => Terminate any instance


También definimos un número máximo/mínimo de máquinas del autoscaling.

Al hacer autoscaling lo suyo es definir varias availability zones (ej.: dos datacenters distintos en Dublín). De esta manera las máquinas que se vayan creando se reparten en esas dos zonas.

Que tenemos que definir:
-AMI
-security group
-tipo de instancia
-key (.pem)
-grupos de autoescalado (en que zonas de disponibilidad)
-si se van a unir a algun balanceador
-algortimos. Hay 4. Como decidir que máquina nos vamos a cargar al reducir las máquinas. Se puede hacer por ejemplo la que haya completado más el ciclo de hora (ya que se cobra por hora completa)
-políticas de autoscaling: como escala y en base a que
-monitorización: se puede usar cloudwatch para obtener las métricas a partir de las que se decidirá escalar


Cool-down, concepto importante:
Lo definimos en el grupo de autoescalado, es un filtro paso bajo.
Tiempo entre el que se van a ejecutar el lanzamiento de máquinas.
Una máquina está muy cargada, se arranca otra, pero como tarda en arracar, y la primera máquina sigue cargada, se lanza otra, etc
Las alarmas que salten entre la ejecución de escalado (reducción o incremento) y el tiempo definido en coold-down no se tendrán en cuenta.
Si lanzamos más de una al mismo tiempo, se tendría en cuenta el tiempo de cool-down activado por la última máquina en levantarse.


## PRECIO ##
Hay que hacer números para ver que sale más rentable


## Pasos ## 
Crear security Group
Crear load balancer
Creo Launch Config
as-create-auto-scaling-group - Tambien se puede desde la consola de aws
  Aqui usamos elegimos una de las conf antes creadas.
as-update-auto-scaling-group para que?
Se crearán máquinas que se unirán al LB.
Definir políticas de crecimiento y decrecimiento (as-put-scaling-policy)
Calcular alarmas sobre métricas para llamar a las políticas de crecimiento y decrecimiento mon-put-metric-alarm

Security group:
aws ec2 create-security-group --group-name asTestGroup --description "Secutiry group. Testing auto scaling"
GroupId: sg-96b4f5e1y
aws ec2 authorize-security-group-ingress --group-name asTestGroup --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name asTestGroup --protocol tcp --port 80 --cidr 0.0.0.0/0

Load Balancer:
aws elb create-load-balancer --load-balancer-name loadTest --listeners "Protocol=tcp,LoadBalancerPort=80,InstanceProtocol=tcp,InstancePort=80" --availability-zones eu-west-1a

Creo launch config:
aws autoscaling create-launch-configuration --launch-configuration-name testLaunchConf --image-id ami-7eb75e09 --key-name asTestKey --security-groups asTestGroup --instance-type t1.micro

Creo autoscaling group (mismas availability zones que el balanceador)
aws autoscaling create-auto-scaling-group --auto-scaling-group-name testGroupAS --launch-configuration-name testLaunchConf --min-size 1 --max-size 3 --availability-zones eu-west-1a --load-balancer-names loadTest --default-cooldown 60 --termination-policies "ClosestToNextInstanceHour"
  Por defecto nos podrá: 
    HealthCheckGracePeriod : 0
    HealthCheckType        : EC2

  --desired-capacity: para definir manualmente cuantas instancias queremos
  --default-cooldown: tiempo, en segundos, que debe pasar entre una operación de scaling y la siguiente ("filtro paso bajo")
  --termination-policies: política de que instancia se debe eliminar al hacer scaling hacia abajo
    http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/us-termination-policy.html#your-termination-policy
    ClosestToNextInstanceHour: las instancias se cobran por horas completas. Matar la que esté más cerca de llegar a su hora completa
    Default
    NewestInstance
    OldestInstance
    OldestLaunchConfiguration: Specify this if you want the instance launched using the oldest launch configuration to be terminated

Defino las políticas de como crecerá y decrecerá el número de máquinas
aws autoscaling put-scaling-policy --auto-scaling-group-name testGroupAS --policy-name creceAS --scaling-adjustment 1 --adjustment-type ChangeInCapacity
aws autoscaling put-scaling-policy --auto-scaling-group-name testGroupAS --policy-name decreceAS --scaling-adjustment -1 --adjustment-type ChangeInCapacity
  Estos comandos nos devuelven un ARN (Amazon Resource Number) que deberemos apuntar para luego poner en las alarmas
  --scaling-adjustment: un número positivo para crecer (o tambien un porcentaje). Número negativo para decrecer (o porcentaje negativo)
  --adjustment-type: 
    ChangeInCapacity: cambia por el numero especificado en scaling-adjustment (suma 1 por ejemplo)
    ExactCapacity: pone el numero de máquinas que diga el scaling-adjustment
    PercentChangeInCapacity: cambia en porcentaje
    http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/as-scale-based-on-demand.html

Tipos de métricas (para usar para definir las alarmas):
aws cloudwatch list-metrics

Defimos alarmas que llamaran a las políticas de crecimiento o decrecimiento
Alarma si pasa por encima del 80% durante 60s
aws cloudwatch put-metric-alarm --alarm-name cpuMayor80 --actions-enabled --alarm-actions arn:aws:autoscaling:eu-west-1:400905189175:scalingPolicy:325e0ed1-db30-4846-b038-824301e34a1f:autoScalingGroupName/testGroupAS:policyName/creceAS --metric-name CPUUtilization --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 60 --unit Seconds --evaluation-periods 2 --threshold 80 --comparison-operator GreaterThanOrEqualToThreshold

Alarma si baja del 20% durante 60s
aws cloudwatch put-metric-alarm --alarm-name cpuMenor20 --actions-enabled --alarm-actions arn:aws:autoscaling:eu-west-1:400905189175:scalingPolicy:7d9c2265-e108-4a97-ba45-e8d7b6f1b05b:autoScalingGroupName/testGroupAS:policyName/decreceAS --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 60 --unit Seconds --evaluation-periods 2 --threshold 20 --comparison-operator LessThanOrEqualToThreshold


Marcar una instancia manualmente como unhealthy
aws autoscaling set-instance-health --instance-id <value> --health-status "Unhealthy"


Como conocer como se ha comportado el Auto Scaling Group
Enviar emails con alertas.
Otra forma:
as-describe-scaling-activities
Describes a set of activities or all activities belonging to a group.



Limitaciones: 125 operaciones de autoescalado al mes, 4 operaciones al días más o menos.
Este límite es por grupo de autoescalado.
