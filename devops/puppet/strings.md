Comillas simples los strings sin variables.
Comillas dobles los strings con variables.

Las palabras propias de puppet sin comillas. Ejemplo: true, false, running...


Hacer regex sobre una variable:
http://docs.puppetlabs.com/references/2.7.3/function.html#regsubst

$var = "/dev/mapper/vg_lv_opt"
$b = regsubst($var, '/', '_', 'G')
_dev_mapper_vg_lv_opt


$var2 = "/"
$a2 = regsubst($var2, '/', '_root_')
$b2 = regsubst($a2, '/', '_', 'G')
notify { "b2: $b2" : }
_root_


Separar por comas (split) y poner prefijo (prefix)
$var = "grupo,boyes"
$array = split($var,",")
$prefix = "t4b-"
$conprefix = prefix($array,$prefix)
$sinarray = join($conprefix,",")
m2m-grupo,m2m-boyes


