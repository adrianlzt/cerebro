# http://www.iem.uni-due.de/~dreibh/subnetcalc/
apt-get install subnetcalc

Ejemplos:

My host has IP 132.252.150.254 and netmask 255.255.255.240. What are the details of its network?
user@host:~$ subnetcalc 132.252.150.254 255.255.255.240

Consider host www.six.heise.de uses a 64-bit prefix length. What are the details of its network?
user@host:~$ subnetcalc www.six.heise.de 64

My new host should use Interface ID 0x100 and Subnet ID 0x1234. Generate a Unique Local IPv6 prefix (40-bit Global ID) for my intranet, using high-quality random numbers!
user@host:~$ subnetcalc 0:0:0:1234::1 56 -uniquelocalhq

Which are DNS reverse lookup name and geo location country of IP 2401:3800:c001::68?
user@host:~$ subnetcalc 2401:3800:c001::68

Which are the MAC address and Solicited Node Multicast address of 2001:638:501:4ef8:223:aeff:fea4:8ca9/64?
user@host:~$ subnetcalc 2001:638:501:4ef8:223:aeff:fea4:8ca9/64
