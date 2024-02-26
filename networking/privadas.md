10.0.0.0 - 10.255.255.255       10.0.0.0/8 (255.0.0.0)
172.16.0.0 - 172.31.255.255     172.16.0.0/12 (255.240.0.0)
192.168.0.0 - 192.168.255.255     192.168.0.0/16 (255.255.0.0)

127.0.0.1/8


https://en.wikipedia.org/wiki/IPv4#Special-use_addresses
192.0.2.0/24  Documentation


0.0.0.0/8 - Current network (only valid as source address) RFC 1700
100.64.0.0 ~ 100.127.255.255 (100.64.0.0/10 prefix) carrier-grade NAT communication between service provider and subscribers
127.0.0.0 is reserved for loopback and IPC on the localhost.
127.0.0.1 ~ 127.255.255.254 (127.0.0.0/8) - loopback IP addresses (refers to self) RFC 5735
192.0.0.0/24 - reserved (IANA) RFC 5735
192.88.99.0/24 - IPv6 to IPv4 relay. RFC 3068
198.18.0.0/15 - network benchmark tests. RFC 2544
198.51.100.0/24 - TEST-NET-2. RFC 5737
203.0.113.0/24 - TEST-NET-3. RFC 5737
224.0.0.0 ~ 239.255.255.255 (224.0.0.0/4) reserved for multicast addresses. RFC 3171
240.0.0.0/4 - reserved (former Class E network) RFC 1700
255.255.255.255 is the limited broadcast address (limited to all other nodes on the LAN) RFC 919

255 in any part of the IP is reserved for broadcast addressing
0.0.0.0 in routing context means the default route (to "the rest of" the internet) RFC 1700
0.0.0.0 in the context of firewalls means "all addresses of the local machine" RFC 1700
