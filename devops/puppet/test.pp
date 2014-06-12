class prueba (
$var
) {

notify {"var: $var":}
}

class {'prueba':
  var => "pepito",
}

