PIM es un servicio para solicitar una elevación de privilegios.

Para ver los recursos gestionados por PIM ir a <https://portal.azure.com/#view/Microsoft_Azure_PIMCommon/CommonMenuBlade/~/azurerbacbrowse>
Elegir la subscription y luego Manage->Assignments para ver quien lo puede aplicar. Manage->Roles para ver los roles elegibles.

Puede tardar unos minutos en hacer efecto. Visto al usar las APIs (terraform).

# az-pim-cli

<https://github.com/netr0m/az-pim-cli>

Automatizar la solicitud de acceso PIM

Parece poco útil para dar permisos a grupos o roles, porque necesita un token que hay que sacar del navegador.
Tal vez se podría automatizar extrayendo de la Session Storage del navegador la key "_-login.windows.net-idtoken-_---", donde dentro está el "secret" que usar como PIM_TOKEN.

Listar recursos tipo grupo:

```bash
PIM_TOKEN=abcd... az-pim-cli list groups
```

```bash
PIM_TOKEN=abcd... az-pim-cli activate group --name="NOMBREGRUPO"
```

Comprobar si tenemos ahora el grupo asignado:

```bash
az ad user get-member-groups --id "$(az ad signed-in-user show --query id -o tsv)"
```
