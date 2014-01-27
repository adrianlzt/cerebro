Specifies a Perl regular expression named groups to extract fields while you search.

| rex mode=sed "s/(\\d{4}-){3}/XXXX-XXXX-XXXX-/g"

| rex field=_raw "From: (?<from>.*) To: (?<to>.*)"


Ejemplo, log de icinga:
[1381474800] SERVICE STATE: CURRENT;localhost;users;OK;HARD;1;

| rex field=_raw "SERVICE STATE: CURRENT;(?<checkHost>[a-zA-Z]+);(?<checkCmd>[a-zA-Z]+);(?<checkState>[A-Z]+);.*"
Saca de del field "_raw" (que es todo el evento) tres campos: checkHost, checkCmd y checkState.
checkHost y checkCmd le decimos que están compuestos 1 o más (+)letras mayúsuclas y/o minúsculas [a-zA-Z]
El checkState en cambio solo puede contener 1 o más letras mayúsculas [A-Z]

También se puede usar sed dentro de la búsqueda.
Ejemplo para ocultar los nombres de los hosts

