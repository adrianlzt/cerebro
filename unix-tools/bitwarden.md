Servidor de contraseñas.

https://github.com/dani-garcia/vaultwarden/
Implementación API-compatible en rust, open source y gratuita.

# Clientes


## CLI oficial
https://github.com/bitwarden/clients/tree/main/apps/cli

Caché local
$HOME/.config/Bitwarden CLI/data.json
  tiene la estructura JSON y los datos cifrados


bw login
  si tenemos distintos servers de bitwarden: https://bitwarden.com/help/cli/#log-in-to-multiple-accounts
bw unlock
  para mantener la sesión activa tenemos que setear BW_SESSION
  export BW_SESSION=$(bw unlock MIPASSWORD --raw 2> /dev/null)
  También se puede pasar un fichero:
  bw unlock --passwordfile ~/Users/Me/Documents/mp.txt
bw sync
  para actualizar la caché local
bw list items
bw search

Borrar todos los items
bw list items | jq '.[].id' -r | xargs -n 1 bw delete item
  al hacer item a item, es bastante lento (~1s por entrada)

Borrar todas las collections
bw list collections | jq '.[].id' -r | xargs -n 1 bw delete org-collection --organizationid efe678ae-ee34-4a6f-be3f-b9f2ba5ca906


Attachments/adjuntos
Parece que no se guardan localmente. Probar.



### API bw serve
bw serve
  levanta una API REST en 8087 para poder consultar el vault

Swagger
https://bitwarden.com/help/vault-management-api/


#### Attachments
Solo funciona si se usa la cli "bw" con node 16: https://github.com/dani-garcia/vaultwarden/discussions/3935#discussioncomment-7145524

curl  "http://localhost:8087/attachment?itemid=e6bb816a-ee6b-4d7e-a887-8a700fe7a21f" -F "file=@Pipfile"


## CLI rust
https://github.com/doy/rbw

Funcionalidad más limitada.
Caché local

## https://github.com/mvdan/bitw
bitwarden expuesto via org.freedesktop.service dbus



## Desktop client
https://bitwarden.com/download/
Electron

https://contributing.bitwarden.com/getting-started/clients/desktop/


# https://github.com/quexten/goldwarden
Para integrar bitwarden con Linux, para poder usarlo como ssh-agent, desbloquear el vault, etc.
