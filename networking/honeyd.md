http://www.honeyd.org/

Honeyd is a service intended to create virtual servers on a network, which can respond to TCP requests etc, for network intrustion detection. It does all this by using promiscuous mode networking and raw sockets, so that it doesn't require changes to the host's real application-level network stack at all.

Honeyd is a small daemon that creates virtual hosts on a network. The hosts can be configured to run arbitrary services, and their personality can be adapted so that they appear to be running certain operating systems. Honeyd enables a single host to claim multiple addresses - I have tested up to 65536 - on a LAN for network simulation. Honeyd improves cyber security by providing mechanisms for threat detection and assessment. It also deters adversaries by hiding real systems in the middle of virtual systems.


The honeyd literature also pointed me in the direction of combining honeyd with farpd so that the mock servers can respond to ARP requests.
