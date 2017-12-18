Control Panel > Administrative Tools -> View local services

Se almacenan en:
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services
Podemos modificar los valores, pero si borramos un "path" completo luego se quejará windows.


# CLI
Desde una shell como admin

sc query
  listar services

sc queryex NAME
  info del servicio

sc delete NOMBRE
  borrar service


# Errores
Si al intentar borrar un service nos dice que esta "pending for deletion", cerrar el MMC (la app para gestionar los services)
Buscar si hay algun proceso mmc.exe corriendo y matarlo.
