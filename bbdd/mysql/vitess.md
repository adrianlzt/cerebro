https://github.com/youtube/vitess
https://github.com/youtube/vitess/blob/master/doc/Vision.markdown

Vitess tries to bring the best of both worlds by trading off some of MySQL's consistency features in order to achieve the kind of scalability that NoSQL databases provide.


Priorities

Scalability: This is achieved by replication and sharding.

Efficiency: This is achieved by a proxy server (vttablet) that mediates all queries and connections. It also utilizes a more efficient rowcache to short-cut some of the queries. This effectively increases a typical MySQL's serving capacity.

Manageability: As soon as you add replication and sharding that span across multiple data centers, the number of servers spirals out of control. Vitess provides a set of tools backed by a lockserver (zookeeper) to track and administer them.

Simplicity: As the complexity grows, it's important to hide this from the application. The vtgate servers give you a unified view of the fleet that makes it feel like you're just interacting with one database.
