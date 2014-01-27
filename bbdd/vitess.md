https://code.google.com/p/vitess/

The main goal of the vitess project is to provide servers and tools to facilitate scaling of MySQL databases for the web. The Project Goals page has more details on this. You can also review the slides from our presentation at the MySQL/Percona conference.

Vtocc is the first usable product of vitess. It acts as a front-end to MySQL providing an RPC interface that accepts and transmits SQL commands. It is capable of efficiently multiplexing a large number of incoming connections (10K+) over a small number of db connections at reasonable throughput (~10kqps). It also has an SQL parser which gives the server the ability to understand and intelligently reshape the queries it receives.

Vtocc is already being used in a large scale production environment. It is the core of YouTube's new MySQL serving infrastructure.


