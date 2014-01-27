http://collectd.org/

Infrastructure Metrics: cpu, memory, redis, nginx, varnish, etc

collectd is a daemon which collects system performance statistics periodically and provides mechanisms to store the values in a variety of ways, for example in RRD files.
collectd gathers statistics about the system it is running on and stores this information. Those statistics can then be used to find current performance bottlenecks (i.e. performance analysis) and predict future system load (i.e. capacity planning). Or if you just want pretty graphs of your private server and are fed up with some homegrown solution you're at the right place, too ;).

The convenience of CollectD
Collects system metrics such as CPU, Memory, Disk, Network
An array of plugins which extend metrics gathering all the way through your stack to the likes of Varnish, Nginx, Memcached, Redis, MySQL, Postgres, RabbitMQ.
Custom extensibility with the ‘exec’ plugin if that’s not enough.
