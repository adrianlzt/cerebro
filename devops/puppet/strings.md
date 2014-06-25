Comillas simples los strings sin variables.
Comillas dobles los strings con variables.

Las palabras propias de puppet sin comillas. Ejemplo: true, false, running...

heredoc.md
Para meter strings largas en una variable


Hacer regex sobre una variable:
http://docs.puppetlabs.com/references/2.7.3/function.html#regsubst

$var = "/dev/mapper/vg_lv_opt"
$b = regsubst($var, '/', '_', 'G') <- la G es que se aplique más de una vez
_dev_mapper_vg_lv_opt

$var2 = "este.es.el.fqdn"
$a2 = regsubst($var2, '\.', '_','G')
notify { "a2: $a2" : }
este_es_el_fqdn

Equivalente:
$a2 = inline_template("<%= @var2.gsub('.', '_') %>")



$var2 = "/"
$a2 = regsubst($var2, '/', '_root_')
notify { "a2: $a2" : }
_root_


Separar por comas (split) y poner prefijo (prefix)
$var = "grupo,boyes"
$array = split($var,",")
$prefix = "t4b-"
$conprefix = prefix($array,$prefix)
$sinarray = join($conprefix,",")
m2m-grupo,m2m-boyes



Usar una varible si está definida, si no, la otra:
#$var = "hola"
$var2 = "adios"
notify {"mensaje":
  message => inline_template("<% if @var %> $var <% else %> $var2 <% end %>")
}

Generar una variable solo con variables que estén defindas:
$fin = inline_template("<% if @conf %>$conf <% end %><% if @tag %>$tag <% end %><% if @log %>$log<% end %>")



Usar el contenido de una variable para generar el nombre de otra variable
$valor = inline_template("<%= @var_${name} %>")
$ipaddr = inline_template("<%= scope.lookupvar('::ipaddress_${var2}') %>")


