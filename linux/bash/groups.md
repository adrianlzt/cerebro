http://www.gnu.org/software/bash/manual/html_node/Command-Grouping.html

( list )
Placing a list of commands between parentheses causes a subshell environment to be created

{ list; }
Placing a list of commands between curly braces causes the list to be executed in the current shell context. No subshell is created. The semicolon (or newline) following list is required.


(date ; ps -ef | wc -l ) >> Activity.log
almacenar en el fichero .log la fecha y el numero de procesos


echo init && { false && echo "rename" || true } && echo "set"
Siempre tendremos "init" y "set".
"rename" solo funcionará cuando "false" devuelva true (o el comando que pongamos ahi)


Ejemplos también en unix-tools/head.md

➜ ps -eo comm,rss  | {head -1 ; grep skydive}
COMMAND           RSS
skydive         196940

