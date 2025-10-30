PIM es un servicio para solicitar una elevación de privilegios.

Para ver los recursos gestionados por PIM ir a <https://portal.azure.com/#view/Microsoft_Azure_PIMCommon/CommonMenuBlade/~/azurerbacbrowse>
Elegir la subscription y luego Manage->Assignments para ver quien lo puede aplicar. Manage->Roles para ver los roles elegibles.

Puede tardar unos minutos en hacer efecto. Visto al usar las APIs (terraform).

# Policies

Al crear las asignaciones, existen políticas que limitan el tiempo máximo de expiración y si puede ser sin expiración.
Si queremos comprobar esa política para un role determinado de una subscription, podemos usar (<https://gist.github.com/adrianlzt/73fb6f2a68c6e2c7dcb7260c6f580af4>):

```bash
❯ uv run check_policy.py --subscription "foobar" --role "Contributor"
Found RoleManagementPolicyExpirationRule:
  ID: Expiration_Admin_Eligibility
  Is Expiration Required: True
  Maximum Expiration: P365D
```

Listar políticas para una subscription:

```bash
az rest -m get --header "Accept=application/json" -u 'https://management.azure.com/providers/Microsoft.Subscription/subscriptions/SUBSCRIPTIONID/providers/Microsoft.Authorization/roleManagementPolicies?api-version=2020-10-01'
```

Ver reglas de expiración para un rol determinado (pasando su id).

```bash
az rest -m get --header "Accept=application/json" -u 'https://management.azure.com/providers/Microsoft.Subscription/subscriptions/ca10b945-6790-40c1-8f2b-8d8db9294292/providers/Microsoft.Authorization/roleManagementPolicies?api-version=2020-10-01' | jq '.value[] | select(.name == "b24988ac-6180-42a0-ab88-20f7382dd24c")' | jq '.properties.effectiveRules[] | select(.ruleType == "RoleManagementPolicyExpirationRule")'
```

Tendremos tres reglas:
Expiration_Admin_Eligibility: cuanto durará esta regla PIM
Expiration_Admin_Assignment: cuanto tiempo puede asignarse este rol un admin
Expiration_EndUser_Assignment: cuanto tiempo puede asignarse este rol un usuario normal

Modificar una policy Expiration_Admin_Eligibility para permitir NoExpiration:

```bash
az rest -m patch --header "Content-Type=application/json" -u https://management.azure.com/providers/Microsoft.Subscription//subscriptions/SUBSCRIPTIONID/providers/Microsoft.Authorization/roleManagementPolicies/ROLEMANAGEMENTID\?api-version\=2020-10-01 --body '{ "properties": { "rules": [ { "isExpirationRequired": false, "maximumDuration": "P365D", "id": "Expiration_Admin_Eligibility", "ruleType": "RoleManagementPolicyExpirationRule", "target": { "caller": "Admin", "operations": [ "All" ], "level": "Eligibility", "targetObjects": null, "inheritableSettings": null, "enforcedSettings": null } } ] } }'
```

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
