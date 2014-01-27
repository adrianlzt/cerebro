http://mesos.apache.org/
http://mesosphere.io

Apache Mesos is a cluster manager that provides efficient resource isolation and sharing across distributed applications, or frameworks. It can run Hadoop, MPI, Hypertable, Spark, and other applications on a dynamically shared pool of nodes.

Computer resource management software. You can combine many servers as a one “virtual computer” with Mesos. Mesos itself is just allocating resources, so you have to use frameworks to manage these resources.

http://tech.riywo.com/blog/2013/12/20/fluentd-on-mesos-plus-docker-plus-marathon/

https://github.com/mesosphere/mesos-docker


## Marathon ##
https://github.com/mesosphere/marathon

Marathon is a framework on Mesos, which is like “upstart for virtual computer”. Marathon makes sure the number of running tasks, so if one of Mesos slave goes down, Marathon starts new instances on other slaves.

Marathon also manages port of instances. You can get the list of host:port of your applications just asking Marathon API; this is kind of service discovery.


## Chronos
https://github.com/airbnb/chronos
http://mesosphere.io/learn/run-chronos-on-mesos/

Fault tolerant job scheduler that handles dependencies and iso8601 based schedules.

