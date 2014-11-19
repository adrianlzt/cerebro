http://www.my-plugin.de/wiki/projects/check_generic/start

check_generic is the Nagios plugin you always needed but never wrote 

It executes any command (line) and compares the output against arbitrary numerical or string expressions. Allowed is everything known from perl. Also performance data can be gathered using check_generic.

Ejemplos:
http://www.my-plugin.de/wiki/projects/check_generic/examples

check_generic -n nagios_service_latency -e "/usr/local/nagios/bin/nagiostats -m -d AVGACTSVCLAT" -c ">60000" -w ">500"

check_generic -n "proc_meminfo_memfree" -e "grep -i memfree /proc/meminfo | awk '{print \$2}'" -w '<5000' -c '<2000' -p "free_KB"

