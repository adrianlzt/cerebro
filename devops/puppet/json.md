$var = parsejson('{"primero" : 1, "segundo" : "dos", "ter": "cuatro"}')
notify {$var: }
notify {$var["segundo"]: }

Las comillas tienen que ser simples delimitando el json y dobles en el interior:
var => "{'jamon':'2kilos'}"  da ERROR

Si pedimos una variable que no existe, $var["noexiste"], nos devolverá undef



El parsejson no puede recibir un elemento vacío, porque dará el error:
Error: Could not retrieve catalog from remote server: Error 400 on SERVER: source did not contain any PSON!

  if empty($params) {
    $_params = '{}'
  } else {
    $_params = $params
  }

