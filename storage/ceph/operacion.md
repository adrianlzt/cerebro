# Fallo de un OSD
Total cluster capacity is reduced by some fractions.
Total cluster throughput is reduced by some fractions.
The cluster enters a write heavy recovery processes.

A general thumb of rule to calculate recovery time in a ceph cluster given 1 disk per OSD node is : 
Recovery Time in seconds = disk capacity in Gigabits / ( network speed *(nodes-1) )
