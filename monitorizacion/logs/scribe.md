https://github.com/facebook/scribe

Servidor que se instala en cada máquina que agrega logs para mandarlo a servidores centrales.

Scribe is a server for aggregating streaming log data. It is designed to scale to a very large number of nodes and be robust to network and node failures. There is a scribe server running on every node in the system, configured to aggregate messages and send them to a central scribe server (or servers) in larger groups. If the central scribe server isn’t available the local scribe server writes the messages to a file on local disk and sends them when the central server recovers. The central scribe server(s) can write the messages to the files that are their final destination, typically on an nfs filer or a distributed filesystem, or send them to another layer of scribe servers.
