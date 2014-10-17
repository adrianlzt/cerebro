## Marathon ##
https://github.com/mesosphere/marathon

Marathon is a framework on Mesos, which is like “upstart for virtual computer”. Marathon makes sure the number of running tasks, so if one of Mesos slave goes down, Marathon starts new instances on other slaves.

Marathon also manages port of instances. You can get the list of host:port of your applications just asking Marathon API; this is kind of service discovery.
