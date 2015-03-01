https://code.google.com/p/intrace/
http://code.google.com/p/intrace/wiki/intrace

InTrace is a traceroute-like application that enables users to enumerate IP (both IPv4 and IPv6) hops exploiting existing TCP connections, both initiated from local network (local system) or from remote hosts. It could be useful for network reconnaissance and firewall bypassing. 


http://serverfault.com/questions/637819/how-to-trace-dropped-tcp-connections
I previously stated that tracing an established connection is impossible to do.
This, however, is wrong.

lcamtuf created the 0trace tool that allows TCP tracerouting using packets that match an established connection.
There is an improved version called intrace, and also Python version by Jon Oberheide.

The idea is to sniff for packets for a specified connection, then inject packets with matching TCP sequence numbers while increasing the TTL (just like usual traceroute does).

With several tries and some luck, you might be able to find the hop that starts to drop packets, as this hop will also drop your tracing packets.
