https://code.google.com/p/semicomplete/wiki/Grok

Grok is simple software that allows you to easily parse logs and other files. With grok, you can turn unstructured log and event data into structured data.

The grok program is a great tool for parsing log data and program output. You can match any number of complex patterns on any number of inputs (processes and files) and have custom reactions.


Example:
02-Aug-2012 08:52:52.600 transfer of 'example.com/IN' from 192.168.37.53#53: Transfer completed: 8 messages, 052 records, 20965 bytes, 1.925 secs (372200 bytes/sec)

DNSAXFRCOMPLETE %{MONTHDAY}-%{MONTH}-%{YEAR} %{HOUR}:%{MINUTE}:%{SECOND}\.%{INT} transfer of '%{HOSTNAME:zone}/IN' from %{IP:clientip}#%{POSINT}: Transfer completed:.*messages, %{POSINT:records} records, %{POSINT:octets} bytes,%{SPACE}%{NUMBER:seconds}


grok -f fichero.grok

El fichero.grok tendrá el formato

program {
  #INPUTS
  file "/dir/file" {
    param1: true
  }
  exec "command" {
    read-stderr: true  #Tambien procesa la salida de error estandar. Si esta a false, manda esa salida a la salida de error estandar de grok
  }

  match {
    pattern: "cosa"
    pattern: "%{NUMBER:pid} no se que"

    reaction: "%{@LINE}"  #es la por defecto. Otras opciones: "none" , "sendmail --to pepe@gmail.com -s cosa"

    shell: "/bin/sh" # Por defecto es stdout. Otras opciones: "ps aux | grep" 

    break-if-match: true # Si hay match, no procesa mas match {}
  }

  no-match {
    reaction: "no hay matches"
    shell: "comando blabla"
  }
}

El no-match se ejecuta si no se ha producido ningún match en todo el fichero procesado.
echo "valor de reaction" | comando-de-shell

## REACTIONS
       %{@LINE}
           The line matched.

       %{@MATCH}
           The substring matched

       %{@START}
           The starting position of the match from the beginning of the string.

       %{@END}
           The ending position of the match.

       %{@LENGTH}
           The length of the match

       %{@JSON}
           The full set of patterns captured, encoded as a json dictionary as a structure of { pattern: [ array of captures ] }. We use an array becuase you can use
           the same named pattern multiple times in a match.


