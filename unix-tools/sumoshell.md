https://www.sumologic.com/2015/10/30/analyze-log-files/
https://github.com/SumoLogic/sumoshell

Sumoshell is collection of utilities to improve analyzing log files written in Go. grep can't tell that some log lines span multiple individual lines. Parsing out fields is cumbersome. Aggregating is basically impossible, and there is no good way to view the results. In Sumoshell, each individual command acts as a phase in a pipeline to get the answer you want. Sumoshell brings a lot of the functionality of Sumo Logic to the command line.

Va convirtiendo los datos en JSONs y aplicando parsers, sumas, etc

# Download
https://github.com/SumoLogic/sumoshell/releases

# Uso

$ echo "
> ERROR: [thread=pepe] cosas
> INFO: [thread=pepe] sin problemas
> ERROR: [thread=maria] otro
> ERROR: [thread=pepe] vale" | ./sumo search "ERROR"
{"_raw":"ERROR: [thread=pepe] cosas","_type":"PLUS"}
{"_raw":"ERROR: [thread=maria] otro","_type":"PLUS"}
{"_raw":"ERROR: [thread=pepe] vale","_type":"PLUS"}


... | ./sumo search "ERROR" | ./sumo parse "thread=*]" as hilo
{"_raw":"ERROR: [thread=pepe] cosas","_type":"PLUS","hilo":"pepe"}
{"_raw":"ERROR: [thread=maria] otro","_type":"PLUS","hilo":"maria"}
{"_raw":"ERROR: [thread=pepe] vale","_type":"PLUS","hilo":"pepe"



LC_ALL=c iostat 2 2 > /tmp/IOSTAT
cat /tmp/IOSTAT  | sumo search  | tr -s ' ' | sumo parse "* * * * * *" as device, tps, kB_reads, kB_wrtns kB_read kB_wrtn | sumo sum tps by device | render
