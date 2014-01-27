> var <- "16/Jul/2013:13:45:03"
> strptime(var,format('%d/%b/%Y:%H:%M:%S'))
[1] "2013-07-16 13:45:03"

Al estar en un pc en español el LC_TIME tiene el valor:
> Sys.getlocale("LC_TIME")
[1] "es_ES.UTF-8"

El problema es que si parseo fechas en inglés, los nombres de los meses cambian ('Dec' vs 'Dic'), así que deberemos cambiar a un LC_TIME inglés
Sys.setlocale("LC_TIME", "C")
