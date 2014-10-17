http://mesos.apache.org/
http://mesosphere.io
http://opensource.com/business/14/9/open-source-datacenter-computing-apache-mesos
http://iankent.co.uk/2014/02/26/a-quick-introduction-to-apache-mesos/

Apache Mesos is a cluster manager that provides efficient resource isolation and sharing across distributed applications, or frameworks. It can run Hadoop, MPI, Hypertable, Spark, and other applications on a dynamically shared pool of nodes.


In some ways, Mesos provides the opposite to virtualisation:
  Virtualisation splits a single physical resource into multiple virtual resources
  Mesos joins multiple physical resources into a single virtual resource


Computer resource management software. You can combine many servers as a one “virtual computer” with Mesos. Mesos itself is just allocating resources, so you have to use frameworks to manage these resources.

Tenemos un monton de "slaves" donde hemos instalado mesos. Estos slaves se conetan al master. Los slaves dicen al master que pueden ofrecer (CPUs, memoria, etc).
Por otro se envian al master tareas con ciertos requirimiento de CPU, memoria, etc. Mesos se encarga de coger estas tareas y asignarlas a un slave.

Frameworks. Todo este proceso se realiza en base a ciertos frameworks. Por ejemplo, podemos tener un framework para aplicacion Ruby on Rails. Parte de este framework se instalará en el master (el scheduler) para poder enviar tareas "ror" al master. Y la otra parte se instalará en los slaves (el executor).
