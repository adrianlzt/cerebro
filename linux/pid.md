https://medium.com/@gargi_sharma/pid-allocation-in-linux-kernel-dc0c78d14e77


Valor máximo de pid:
/proc/sys/kernel/pid_max

Por defecto: 32768



Current pid
echo $$

Parent pid
echo $PPID


As new processes fork in, PIDs will increase to a system-dependent limit and then wrap around. The kernel will not reuse a PID before this wrap-around happens.


En AIX parece que la asignación no es secuencial
http://www.faqs.org/faqs/aix-faq/part2/section-20.html
