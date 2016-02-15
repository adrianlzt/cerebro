Ejecuta por debajo nslookup, al menos la version 1.4.16
[pid 11856] execve("/usr/bin/nslookup", ["/usr/bin/nslookup", "-sil", "hi.inet"], [/* 1 var */]) = 0

https://github.com/monitoring-plugins/monitoring-plugins/blob/release-1.4.16/plugins/check_dns.c#L106


Si el server dns no contesta:
$ /usr/lib64/nagios/plugins/check_dns -H hi.inet
CRITICAL - Plugin timed out while executing system call

