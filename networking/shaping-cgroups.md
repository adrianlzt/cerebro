modprobe cls_group

Esta parte sería el que marca el tráfico
cgcreate -g net_cls:bajoBW
cgset -r net_cls.classid=0x00010001 bajoBW
cgcreate -g net_cls:medioBW
cgset -r net_cls.classid=0x00010002 medioBW
cgcreate -g net_cls:altoBW
cgset -r net_cls.classid=0x00010003 altoBW


tc qdisc add dev eth0 root handle 1:0 htb default 3

tc class add dev eth0 parent 1:0 classid 1:1 htb rate 1kbit ceil 1kbit
tc class add dev eth0 parent 1:0 classid 1:2 htb rate 10kbit ceil 10kbit
tc class add dev eth0 parent 1:0 classid 1:3 htb rate 50kbit ceil 50kbit

tc filter add dev eth0 parent 1:0 protocol ip prio 1 handle 1: cgroup
tc filter add dev eth0 parent 1:0 protocol ip prio 1 handle 2: cgroup
tc filter add dev eth0 parent 1:0 protocol ip prio 1 handle 3: cgroup

