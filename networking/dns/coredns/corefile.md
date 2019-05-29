other.example.com {
  loop
  errors
  forward . 10.0.0.14:30053 10.0.0.26:30053 10.0.0.111:30053
}

example.com {
  loop
  errors
  # este fichero debe seguir el estandar de zonas tipico. Buscar ejemplo en internet
  file db.example.com {
    reload 2s
  }
  reload 2s
}

. {
  loop
  errors
  forward . 1.1.1.1 8.8.8.8 9.9.9.9
}

