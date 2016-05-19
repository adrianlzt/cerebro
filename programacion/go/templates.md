https://golang.org/pkg/text/template/
https://golang.org/pkg/html/template/

ejemplo:
http://play.golang.org/p/vVM89Ze40U


Creamos una constante con nuestro template con formato:


{{pipeline}}
{{if pipeline}} T1 {{end}}

{{if pipeline}} T1 {{else if pipeline}} T0 {{ else }} T2 {{end}}
{{range pipeline}} T1 {{end}}
