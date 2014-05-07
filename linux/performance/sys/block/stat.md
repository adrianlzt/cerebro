https://www.kernel.org/doc/Documentation/block/stat.txt

block/DISCO/stat

Name            units         description
----            -----         -----------
read I/Os       requests      number of read I/Os processed
read merges     requests      number of read I/Os merged with in-queue I/O
read sectors    sectors       number of sectors read
read ticks      milliseconds  total wait time for read requests
write I/Os      requests      number of write I/Os processed
write merges    requests      number of write I/Os merged with in-queue I/O
write sectors   sectors       number of sectors written
write ticks     milliseconds  total wait time for write requests
in_flight       requests      number of I/Os currently in flight
io_ticks        milliseconds  total time this block device has been active
time_in_queue   milliseconds  total wait time for all requests
