Invoke-WebRequest eth0.me
Invoke-WebRequest http://eth0.me:8080

# Bajar fichero
Invoke-WebRequest -Uri $url -OutFile $output
  buffer en memoria antes de escribir en disco. Malo para ficheros muy grandes

Import-Module BitsTransfer
Start-BitsTransfer -Source $url -Destination $output
  módulo no siempre disponible

$wc = New-Object System.Net.WebClient
$wc.DownloadFile($url, $output)
  no tiene indicador de porcentaje


Alias:
curl
wget
iwr

# Proxy
-Proxy ...
