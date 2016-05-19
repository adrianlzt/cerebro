https://www.kernel.org/doc/Documentation/iostats.txt
http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/diskstats

Distingue por particiones

Ejemplo:
   8       0 sda 402948 2350 8309496 87260 226371 253149 5347889 315430 0 295570 402430

(1) 8 -> major
(2) 0 -> minor
(3) sda -> device name

---- Reads -----
(4) 402948 - num of reads completed (This is the total number of reads completed successfully)
(5) 2350 -- num of reads merged (Reads and writes which are adjacent to each other may be merged for efficiency)
(6) 8309496 -- num of sectors read (This is the total number of sectors read successfully)
(7) 87260 -- num of milliseconds spent reading (This is the total number of milliseconds spent by all reads)

---- Writes -----
(8) 226371 -- num of writes completed (This is the total number of writes completed successfully)
(9) 253149 -- num of writes merged
(10) 5347889 -- num of sectors written (This is the total number of sectors written successfully)
(11) 315430 -- num of milliseconds spent writing (This is the total number of milliseconds spent by all writes)

---- General -----
(12) 0 -- num of I/Os currently in progress
(13) 295570 -- num of milliseconds spent doing I/Os (This field increases so long as field 9 is nonzero)
(14) 402430 -- weighted num of milliseconds spent doing I/Os 
               This field is incremented at each I/O start, I/O completion, I/O merge, or read of these stats by the
               number of I/Os in progress times the number of milliseconds spent doing I/O since the last update of this field.
               This can provide an easy measure of both I/O completion time and the backlog that may be accumulating.
