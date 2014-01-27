http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-waitcondition-article.html
Ejemplos: http://aws.amazon.com/es/cloudformation/aws-cloudformation-templates/
https://github.com/stelligent/devopsinthecloud/blob/master/infrastructure/templates/jenkins.template

Es la tecnología de amazon aws para hacer el despliegue inicial de las máquinas, y casi cualquier tipo de recurso de AWS.
La idea es que se define en un fichero que es lo que queremos desplegar, y de un solo golpe se despliega todo. A este conjunto de cosas desplegadas se le llama stack.
Seria como ejecutar un puppet pero una única vez, en la construcción de la máquina.
No sirve para después mantener un estado como hace puppet.

Se pueden definir parámetros, packages, services, ficheros, etc (esto es para usarlo con cfn-init en el user-data?)
http://aws.amazon.com/developertools/AWS-CloudFormation/4026240853893296

Nos puede servir para desplegar puppet o chef.

CloudFormation templates with troposphere
http://answersforaws.com/blog/2013/10/cloudformation-templates-with-troposphere/
Esto nos ayuda a generar lo JSON, pero no tiene todas las posibilidades de CloudFormation


La idea es generar un json donde definimos la máquina, key pair, image id, security group, type, user-data, etc.
Luego ejecutamos un comando y creamos una instancia de ese template que hemos creado.

Troposphere nos ayuda a generar ese json, creándolo mediante programación en python.

Una vez tengamos generado el json lanzamos el stack:
El stack es la creación de los security groups, máquinas, load balancears, etc que hayamos definido.
aws cloudformation create-stack --stack-name myteststack --template-body file:///home/local/test/sampletemplate.json



Para ver el estado de las stacks:
aws cloudformation list-stacks (muestra las borradas)
aws cloudformation describe-stacks (muestra más info)

Si pone ROLLBACK_COMPLETE es que ha habído algún problema, mirar el siguiente punto.

Para ver los eventos de una en particular (aqui podemos ver si ha habido algún fallo)
aws cloudformation describe-stack-events --stack-name myteststack

Borrar un stack:
aws cloudformation delete-stack --stack-name myteststack
