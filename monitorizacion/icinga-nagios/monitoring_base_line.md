All packages are from the "official" checks (https://www.monitoring-plugins.org/doc/man/index.html), except specified.
EPEL has a bit olded version (1.4.16). Last version is 2.1 released the 15 of October of this year, but this release doesn't include a spec file to generate the RPMs.

Common for all CentOS:

fs writable
netinterfaces
internet access? (dns query + download small file, some index.html)
ntp?

nfs/cifs/davfs?
/usr/lib64/nagios/plugins/check_mountpoints_nfs.sh -A
https://github.com/echocat/nagios-plugin-check_mountpoints/blob/master/check_mountpoints.sh


/usr/lib64/nagios/plugins/check_disk -w 20% -c 10% -W 20% -K 10%
https://www.monitoring-plugins.org/doc/man/check_disk.html
Warning if any partition is below 20% of disk capacity
Critical if any partition is below 10% of disk capacity
Warning if any partition is below 20% of inode capacity
Critical if any partition is below 10% of inode capacity

/usr/lib64/nagios/plugins/check_load -w 15,10,10 -c 30,25,25
https://www.monitoring-plugins.org/doc/man/check_load.html
http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
Warning/critical if ANY of the load averages (1', 5' or 15') is higher than values.
This should be defined as per cpu count basis.

/usr/lib64/nagios/plugins/check_procs -w 0 -c 9 -s Z
Warning if there is one, or more, zombie proccess.
Critical if there is ten, or more, zombie proccess.

/usr/lib64/nagios/plugins/check_ssh -t 10 localhost
Check that ssh daemon is up and running (check for an open tcp port 22)

/usr/lib64/nagios/plugins/check_swap -a -w 99% -c 40%
Warning if swap consumption is over 1%.
Critical if swap consumption is over 40%.

Swap activity. Check is running for the time we want to measure (no very good behaviour)
http://exchange.nagios.org/directory/Plugins/System-Metrics/Memory/Check-swap-activity-on-Linux/details

/usr/lib64/nagios/plugins/check_diskio --device=devicename --critical=critical --warning=warning
https://svn.id.ethz.ch/nagios_plugins/check_diskio/README
monitor the amount of disk I/O

/usr/lib64/nagios/plugins/check_users -w 5 -c 10
Warning if more than 5 users are connected.
Critical if more than 10 users are connected.

/usr/lib64/nagios/plugins/check_cpu.sh -w 60 -c 80
https://www.monitoringexchange.org/attachment/preview/Check-Plugins/Operating-Systems/check_cpu-sh/check_cpu.sh
Using iostat
Show CPU consumption separated in system, user, iowait and idle.

/usr/lib64/nagios/plugins/check_open_fds.sh -W 75 -C 90
https://github.com/gofullstack/nagios-cookbook/blob/master/files/default/plugins/check_open_fds.sh
Check how many file descriptors are open against the maximum.

/usr/lib64/nagios/plugins/check_pmp_memory.sh -w 70 -c 90
http://www.percona.com/doc/percona-monitoring-plugins/1.1/nagios/pmp-check-unix-memory.html
http://www.percona.com/downloads/percona-monitoring-plugins/LATEST/
Check free memory, without caches and buffers.
Warning if memory used is higher than 70%
Critical if memory used is higher than 90%

/usr/lib64/nagios/plugins/check_open_files.pl -w 50 -c 80
http://exchange.nagios.org/directory/Plugins/Operating-Systems/Linux/check-open-files/details
Check number of open files against the maximum.
Warning if open files are over 50% of maximum open files.
Critical if open files are over 80% of maximum open files.

/usr/lib64/nagios/plugins/check_uptime.pl -f -w 25
http://exchange.nagios.org/directory/Plugins/System-Metrics/Uptime/check_uptime--2F-check_snmp_uptime/details
https://github.com/willixix/WL-NagiosPlugins/blob/master/check_uptime.pl
Warning if system has been up less than 25' (used to check if some system has been rebooted)

/usr/lib64/nagios/plugins/check_ephemeral_ports.sh -w 60 -c 80
https://gist.github.com/anonymous/84966412ec8d77533fbe
Check the number of ports being used against the total pool available.
Warning if more than 60% of ports are being used.
Critical if more than 80% of ports are being used.

/usr/lib64/nagios/plugins/check_timewait.sh
https://gist.github.com/anonymous/97ef0a4d3d16a7b89d12
Check the TIME_WAIT connections percentage over total TCP connections
It is hard to define a warning and critical threshold, but could be useful as a metric.
http://vincent.bernat.im/en/blog/2014-tcp-time-wait-state-linux.html

