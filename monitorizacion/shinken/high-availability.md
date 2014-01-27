The arbiter daemon reads the configuration, divides it into parts (N schedulers = N parts), and distributes them to the appropriate Shinken daemons. Additionally, it manages the high availability features: if a particular daemon dies, it re-routes the configuration managed by this failed daemon to the configured spare.

There can only be one active arbiter with other arbiters acting as hot standby spares in the architecture.


http://www.shinken-monitoring.org/wiki/official/advancedtopics-distributed#the_high_availability
