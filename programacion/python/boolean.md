Convertir string a bool:
distutils.util.strtobool("F")  // true false True False TRUE FALSE t f T F
Devuelve 0 (false) o 1 (true)

Otra forma más cutre:
config.insecure = config.insecure in ['True', 'true', 't', 'yes', 'y', '1', 1]

