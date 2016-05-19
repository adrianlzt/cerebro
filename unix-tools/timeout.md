https://www.gnu.org/software/coreutils/manual/html_node/timeout-invocation.html

timeout 5s yes
Tras 5 segundos mata al comando yes

Ejecutar varios comandos:
timeout 5s sh -c "sleep 3s; echo 'pepe'

124 if command times out
125 if timeout itself fails
126 if command is found but cannot be invoked
127 if command cannot be found
137 if command is sent the KILL(9) signal (128+9)
the exit status of command otherwise


Otras opciones:
http://www.commandlinefu.com/commands/view/3592/execute-a-command-with-a-timeout
very_long_command& sleep 10; kill $!

