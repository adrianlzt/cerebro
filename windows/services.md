Control Panel > Administrative Tools -> View local services

Se almacenan en:
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services
Podemos modificar los valores, pero si borramos un "path" completo luego se quejará windows.


# CLI
## cmd
Desde una shell (cmd, no powershell) como admin

sc query
  listar services

sc queryex NAME
  info del servicio

sc delete NOMBRE
  borrar service

## powershell
https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service?view=powershell-7.1
Get-Service


# Errores
Si al intentar borrar un service nos dice que esta "pending for deletion", cerrar el MMC (la app para gestionar los services)
Buscar si hay algun proceso mmc.exe corriendo y matarlo.
