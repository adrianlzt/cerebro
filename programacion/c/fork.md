https://stackoverflow.com/questions/1653340/differences-between-fork-and-exec

The fork call basically makes a duplicate of the current process, identical in almost every way (not everything is copied over, for example, resource limits in some implementations but the idea is to create as close a copy as possible).

The new process (child) gets a different process ID (PID) and has the the PID of the old process (parent) as its parent PID (PPID). Because the two processes are now running exactly the same code, they can tell which is which by the return code of fork - the child gets 0, the parent gets the PID of the child. This is all, of course, assuming the fork call works - if not, no child is created and the parent gets an error code.

The exec call is a way to basically replace the entire current process with a new program. It loads the program into the current process space and runs it from the entry point.

So, fork and exec are often used in sequence to get a new program running as a child of a current process. Shells typically do this whenever you try to run a program like find - the shell forks, then the child loads the find program into memory, setting up all command line arguments, standard I/O and so forth.
