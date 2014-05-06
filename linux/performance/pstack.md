http://www.linuxcommand.org/man_pages/pstack1.html

  pstack  attaches  to the active processes named by the pids on the com-
       mand line, and prints out an execution stack trace, including a hint at
       what  the function arguments are.  If symbols exist in the binary (usu-
       ally the case unless you have run strip(1)),  then  symbolic  addresses
       are printed as well.

       If  the process is part of a thread group, then pstack will print out a
       stack trace for each of the threads in the group.


http://lsstack.sourceforge.net/
lsstack is a Linux implementation of the "pstack" utility from Solaris lsstack is a command line utility which (efficiently and quickly) prints the call stacks for all threads in a specified process, with symbolic names for functions, where symbols ar
