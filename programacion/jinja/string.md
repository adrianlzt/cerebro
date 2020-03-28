No sacar nada si es None
{{conn if conn is not none}}


Convertir una lista separada por comas en un array
foo.split(",")


https://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines/21699210#21699210
>, |: "clip": keep the line feed, remove the trailing blank lines.
>-, |-: "strip": remove the line feed, remove the trailing blank lines.
>+, |+: "keep": keep the line feed, keep trailing blank lines.


- adri: >-
    {{scheme}}://{{host}}:{{port}}/{{path}}

En "adri" tendremos el contenido de las variables como una string sin newline al final


Partir una linea (sin espacios en blanco ni new lines)
- adri: "{{scheme}}://{{host}}:\
    {{port}}/{{path}}"

