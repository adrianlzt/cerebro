Arrancar una ami. Instalar apache+php
Poner como index.php un generador de dígitos de pi adrianRepo/programacion/php/calculate_pi.php (se le puede pasar el parametro ?n= para que saque más digitos y produzca más carga, load, a la máquina).
Asegurarnos que la máquina según se encienda va a contestar correctamente al php (chkconfig con apache, etc)

Creamos una ami de esta máquina que acabamos de crear.
Desde la consola web, botón derecho, Create Image.
Copiamos el número ami que nos da (ami-xxxx)

Creamos el autoscaling group.
Desde la consola web, ir a AUTO SCALING -> Launch Configurations.
Seleccionamos la ami que hemos creado (en My AMIs)
Habilitar la monitorización con CloudWatch.
Creamos un security group con acceso ssh y http.
Elegimos un keypair del que tengamos la clave privada para poder acceder a las máquinas por ssh.

La consola web nos redirige a Create Auto Scaling Group.
Salimos para crear primero un load balancer.

En la consola web, NETWORK & SECURITY -> Load Balancers
Balanceo de HTTP, puerto 80, dejamos el resto como está.
El ping path debe apuntar a una web que de un 200. Será la forma en la que el LB decida si balancea a ese nodo.
Pondremos el check interval a 0.1min y el unhealthy and healthy thresholds a 2 (para no tener que esperar mucho a que el balanceador empieze a balancear a las nuevas máquinas que se lenvanten)
Creamos un nuevo security group que solo habilite http (será por donde entrarían los usuarios finales)
Cuando nos pide a que máquina balancear, no elegimos ninguna, y seguimos al siguiente paso.

Ahora vamos a crear el autoscaling group.
Seleccionamos el launch conf que habíamos creado antes.
Ahora definimos el nombre, número de instancias que se lenvantan al inicio.
  Cuando nos dice que subnets elegir, nos está preguntando en que AZs queremos que se creen las máquinas.
Desplegamos las "Advanced options" y seleccionamos "Receive traffic from EBS", y elegimos el que hemos creado en el paso anterior.
Activamos la monitorización con CloudWatch, que será necesaria para arrancar según la carga de las máquinas.
En el siguiente paso elegimos usar políticas para definir la capcidad del grupo.
Elegimos el número de instancias mínimas y máximas que va a tener el scale group.
Luego definimos una política de incremento de máquinas y una política de decremento de máquinas.
Para el incremento de máquinas:
  Execute policy when: Elegimos Add new Alarm
    El primer parámetro es si queremos que nos avise mediante email cuando crezca el número de máquinas (subject del email y destinatarios)
    Luego definimos que parámetro (por ejemplo, load de todas las máquinas del auto scaling group) vamos a usar para decidir si hace falta crear nuevas máquinas
    Elegimos por ejemplo: Average - CPU Utilizacion >= 70%, For at least 1 consecutive periods of 1minute.
  Luego defimos cuantas máquinas nuevas agregar (Add), o cuantas tener en total (Set to). Al añadir se puede determinar número de máquinas, o un porcentaje.
  Por último definimos el "Cool Down", tiempo de espera entre operaciones de "increase group size".
    Es una forma de que no se levanten muchas máquinas ante un pico puntual
    Ponemos 60s por ejemplo.
Para el decremento de máquinas.
  Alarma: Average - CPU Utilization <= 30  (es importante que entre el porcentaje de creación y destrucción haya bastante diferencia, para que nos suceda que se puedan andar creando y destruyendo máquinas muy habitualmente porque justo la carga se encuentre entre estos dos valores)
  Remove: 1
  Wait: 60s
  Cuidado que el nombre de la alarma de decrease no sea igual que la de increase y este sobreescribiendo la otra.
  En la cosola web falta una opción importante a la hora de eliminar máquinas del grupo, y es la política de eliminación que vamos a seguir "Termination Policies".
    Con esto determinamos como vamos a elegir la máquina que eliminar. http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/us-termination-policy.html
    Las políticas son: OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.

Cuando finalicemos el autoscaling group levantará el número de instancias mínimas que hayamos elegido.

Ahora miramos el dns del LB para saber a que web ir para pedir el php.

Usaremos siege para hacer muchas peticiones simultáneas a las máquinas, ver como la carga aumenta, y forzar al auto scaling group a crear nuevas máquinas.
siege -c 10 -t 0 http://ec2-54-242-37-129.compute-1.amazonaws.com/pi.php

Entraremos en cloud watch para ver como va aumentando la carga, y comprobaremos que cuando salte la alarma de alta carga, se creará una nueva máquina.
Si la carga sigue siendo alta, tras el periodo de cooldown volverá a crease otra, y así sucecisivamente.

Cuando paremos siege, saltará la alarma de "decrease", y se comenzarán a eliminar máquinas.
