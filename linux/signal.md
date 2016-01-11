The most common signal is SIGINT , the signal sent when CTRL+c is pressed.
When running subprocesses, the SIGCHLD signal is sent when a child process exits.
Resizing the terminal sends the SIGWINCH signal to the applications running in the terminal.
Putting the application in background (ex: press CTRL-z and then type the bg command) sends the SIGCONT signal.
