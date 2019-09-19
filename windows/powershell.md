PowerShell se basa en objetos.
Es una shell orientada  a objetos.


Crear un fichero con nombre: ejemplo.ps1

Dar con el botón derecho y dar a "Editar"

En el script es como en bash, pondremos lo comandos directamente


# Diccionario / Hash table
https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hash_tables?view=powershell-6
$hash = @{ Number = 1; Shape = "Square"; Color = "Blue"}
$hash.Number


# Documentar / comentarios
https://poshcode.gitbooks.io/powershell-practice-and-style/Style-Guide/Documentation-and-Comments.html


# Style-Guide
https://poshcode.gitbooks.io/powershell-practice-and-style/content/Style-Guide/Introduction.html



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

cmd1; cmd2


# Host / nslookup / DNS
[System.Net.Dns]::GetHostAddresses("let1esa1").IPAddressToString


# Asignar variables
$foo = (comando)


# Condicionales
if ($foo) {
  "mensaje true"
} else {
  "es falso"
}

Si $foo es un objecto vacío será false


# Test
mirar tests.md


# Leer/Escribir ficheros
https://powershellexplained.com/2017-03-18-Powershell-reading-and-saving-data-to-files/#saving-and-reading-data

Out-File, escribir en un fichero
Get-Content, leer de un fichero

Para serializar/deserializar (XML):
Get-Date | Export-Clixml date.clicml
$date = Import-Clixml .\date.clicml
$date.GetType()


Para usar JSON
$Data | ConvertTo-Json | Add-Content  -Path $Path
$NewData = Get-Content -Path $Path -Raw | ConvertFrom-Json


# Calcular SHA
Get-FileHash fichero
  por defecto es SHA256
Get-FileHash -Algorithm MD5 fichero
