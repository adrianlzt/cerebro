http://www.lehman.cuny.edu/cgi-bin/man-cgi?pstack+1

     pflags              Print the /proc tracing flags, the pend-
                         ing  and  held  signals, and other /proc
                         status information for each lwp in  each
                         process.

     pcred               Print or set the credentials (effective,
                         real,  saved UIDs and GIDs) of each pro-
                         cess.

     pldd                List the dynamic libraries  linked  into
                         each  process,  including shared objects
                         explicitly  attached  using  dlopen(3C).
                         See also ldd(1).

     psig                List the signal actions and handlers  of
                         each process. See signal.h(3HEAD).

     pstack              Print a  hex+symbolic  stack  trace  for
                         each lwp in each process.

     pfiles              Report fstat(2) and fcntl(2) information
                         for  all  open files in each process. In
                         addition, a path to the file is reported
                         if  the  information  is  available from
                         /proc/pid/path. This is not  necessarily
                         the same name used to open the file. See
                         proc(4) for more information.

     pwdx                Print the current working  directory  of
                         each process.

     pstop               Stop each process (PR_REQUESTED stop).

     prun                Set each  process  running  (inverse  of
                         pstop).

     pwait               Wait for all of the specified  processes
                         to terminate.

     ptime               Time  the  command,  like  time(1),  but
                         using microstate accounting for reprodu-
                         cible precision. Unlike  time(1),  chil-
                         dren of the command are not timed.
