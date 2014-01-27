Si vamos a definir un monton de recursos parecidos que usan parámtros igual, definimos el recurso con mayúscula, y ahí los parámetros por defecto.
El resto de recursos cogerán ese valor.

File {
  owner => 'root',
  group => 'root',
}

file {'/bla/bla/a':
  source => ...
  ...
}


file {'/bla/bla/b':
  source => ...
  ...
}
