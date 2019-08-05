Crear un fichero con nombre: ejemplo.ps1

Dar con el botón derecho y dar a "Editar"

En el script es como en bash, pondremos lo comandos directamente


# Mostrar ventana grafica con el output de un comando
... | Out-Grid


# Obtener la versión
$PSVersionTable.PSVersion
$PSVersionTable.PSVersion.Major


# Get-Command / locate / whereis
https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-command?view=powershell-5.1
Nos devuelve una lista de comandos disponibles.
O podemos usarlo para saber si tenemos disponbile un comando:
  Get-Command facter


# Grep
# Where-Object
Get-NetIPAddress -AddressFamily IPv4 | Where-Object IPAddress -Eq 127.0.0.1
  solo quedarnos con el objeto cuyo campo IPAddress tenga el valor 127.0.0.1

## Select-String
"Hello","HELLO" | Select-String -Pattern "HELLO" -CaseSensitive
  inverse: -NotMatch

# Logs de ejecucción
https://docs.microsoft.com/es-es/powershell/wmf/5.0/audit_script

Control Panel -> View event logs
ETW, Microsoft-Windows-PowerShell/Operational


# Select-Object
Nos permite solo quedarnos con alguna parte de los objetos que vienen por el pipe


# Subshell
Invoke-Command {cmd1; cmd2} | cmd3



# Test
mirar tests.md
