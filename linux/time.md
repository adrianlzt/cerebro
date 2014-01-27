http://stackoverflow.com/questions/4189123/python-how-to-get-number-of-mili-seconds-per-jiffy

Valor con el que se mide el user time y system time de los procesos /proc/PID/stat:

              utime %lu   (14) Amount of time that this process has been scheduled in user mode, measured in clock  ticks  (divide  by  sysconf(_SC_CLK_TCK)).   This
                          includes  guest  time,  guest_time (time spent running a virtual CPU, see below), so that applications that are not aware of the guest time
                          field do not lose that time from their calculations.

              stime %lu   (15) Amount of time that this process has been scheduled in kernel mode, measured in clock ticks (divide by sysconf(_SC_CLK_TCK))



The Software Clock, HZ, and Jiffies

The accuracy of various system calls that set timeouts, (e.g., select(2), sigtimedwait(2)) and measure CPU time (e.g., getrusage(2)) is limited by the resolution of the software clock, a clock maintained by the kernel which measures time in jiffies. The size of a jiffy is determined by the value of the kernel constant HZ.

The value of HZ varies across kernel versions and hardware platforms. On i386 the situation is as follows: on kernels up to and including 2.4.x, HZ was 100, giving a jiffy value of 0.01 seconds; starting with 2.6.0, HZ was raised to 1000, giving a jiffy of 0.001 seconds. Since kernel 2.6.13, the HZ value is a kernel configuration parameter and can be 100, 250 (the default) or 1000, yielding a jiffies value of, respec‐ tively, 0.01, 0.004, or 0.001 seconds. Since kernel 2.6.20, a further frequency is available: 300, a number that divides evenly for the com‐ mon video frame rates (PAL, 25 HZ; NTSC, 30 HZ).

The times(2) system call is a special case. It reports times with a granularity defined by the kernel constant USER_HZ. Userspace applica‐ tions can determine the value of this constant using sysconf(_SC_CLK_TCK).


Para obtener el valor con python:
$ python 
>>> import os
>>> os.sysconf_names['SC_CLK_TCK']
2
>>> os.sysconf(2)
100


