Mirar linux/kill.md

The most common signal is SIGINT , the signal sent when CTRL+c is pressed.
When running subprocesses, the SIGCHLD signal is sent when a child process exits.
Resizing the terminal sends the SIGWINCH signal to the applications running in the terminal.
Putting the application in background (ex: press CTRL-z and then type the bg command) sends the SIGCONT signal.


In Unix-like operating systems, if a process is terminated with a signal, the exit code is the result of 128 + the signal number (https://tldp.org/LDP/abs/html/exitcodes.html)

139 = 128 + 11, where 11 represents SIGSEGV (segmentation fault)
134 = 128 + 6 which is SIGABRT (abort)
