Crear un fichero con nombre: ejemplo.ps1

Dar con el botón derecho y dar a "Editar"

En el script es como en bash, pondremos lo comandos directamente


# Obtener la versión
$PSVersionTable.PSVersion
$PSVersionTable.PSVersion.Major


# Get-Command / locate / whereis
https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-command?view=powershell-5.1
Nos devuelve una lista de comandos disponibles.
O podemos usarlo para saber si tenemos disponbile un comando:
  Get-Command facter
