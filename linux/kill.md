The exit code of your "kill -0 PID" command just returns 0 if you can send a signal to PID, and returns 1 if you can't (don't have access or invalid PID)


 1) HUP       2) INT       3) QUIT      4) ILL       5) TRAP
 6) ABRT      7) BUS       8) FPE       9) KILL     10) USR1
11) SEGV     12) USR2     13) PIPE     14) ALRM     15) TERM
16) STKFLT   17) CHLD     18) CONT     19) STOP     20) TSTP
21) TTIN     22) TTOU     23) URG      24) XCPU     25) XFSZ
26) VTALRM   27) PROF     28) WINCH    29) IO       30) PWR
31) SYS      34) RTMIN    35) RTMIN+1  36) RTMIN+2  37) RTMIN+3
38) RTMIN+4  39) RTMIN+5  40) RTMIN+6  41) RTMIN+7  42) RTMIN+8
43) RTMIN+9  44) RTMIN+10 45) RTMIN+11 46) RTMIN+12 47) RTMIN+13
48) RTMIN+14 49) RTMIN+15 50) RTMAX-14 51) RTMAX-13 52) RTMAX-12
53) RTMAX-11 54) RTMAX-10 55) RTMAX-9  56) RTMAX-8  57) RTMAX-7
58) RTMAX-6  59) RTMAX-5  60) RTMAX-4  61) RTMAX-3  62) RTMAX-2
63) RTMAX-1  64) RTMAX


Signal     Value     Action   Comment
──────────────────────────────────────────────────────────────────────
HUP        1       Term    Hangup detected on controlling terminal
                              or death of controlling process
INT        2       Term    Interrupt from keyboard  (Control+c)
QUIT       3       Core    Quit from keyboard
ILL        4       Core    Illegal Instruction
ABRT       6       Core    Abort signal from abort(3)
FPE        8       Core    Floating point exception
KILL       9       Term    Kill signal
SEGV      11       Core    Invalid memory reference
PIPE      13       Term    Broken pipe: write to pipe with no
                              readers
ALRM      14       Term    Timer signal from alarm(2)
TERM      15       Term    Termination signal (por defecto si hacemos kill)
USR1   30,10,16    Term    User-defined signal 1
USR2   31,12,17    Term    User-defined signal 2
CHLD   20,17,18    Ign     Child stopped or terminated
CONT   19,18,25    Cont    Continue if stopped
STOP   17,19,23    Stop    Stop process
TSTP   18,20,24    Stop    Stop typed at terminal
TTIN   21,21,26    Stop    Terminal input for background process
TTOU   22,22,27    Stop    Terminal output for background process


Parar y rearrancar un proceso
kill -STOP PID
kill -CONT PID


Quitar un proceso zombie
kill -s SIGCHLD PID_PADRE


Señal usada generalmente para hacer un reload:
kill -HUP PID

