http://bwachter.lart.info/linux/bridges.html

# brctl addbr br0
# brctl addif br0 eth0
# brctl addif br0 eth1
# ifconfig br0 netmask 255.255.255.0 192.168.32.1 up
