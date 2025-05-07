# Asignar permisos

<https://portal.azure.com/#view/Microsoft_AAD_IAM/RolesManagementMenuBlade/~/AllRoles/adminUnitObjectId//resourceScope/%2F>

Dese esa vista con todos los roles, pinchar en el que queremos asignar, pinchar sobre su nombre.
En la nueva ventana pinchar en "Add assigment". Buscar el usuario/sp que queremos darle permisos y Add.

# Global admin

Siendo global admins hace falta un paso más para poder actuar como tal, "elevar los permisos".
<https://learn.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin?tabs=azure-portal#how-does-elevated-access-work>

# Crear roles con az

custom_role.json:

```json
{
  "Name": "VM App Gateway VMSS Operator",
  "IsCustom": true,
  "Description": "Can start and stop VMs, Application Gateways, and VMSS.",
  "Actions": [
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/deallocate/action",
    "Microsoft.Compute/*/read",
    "Microsoft.Network/applicationGateways/start/action",
    "Microsoft.Network/applicationGateways/stop/action",
    "Microsoft.Network/applicationGateways/read",
    "Microsoft.Compute/virtualMachineScaleSets/start/action",
    "Microsoft.Compute/virtualMachineScaleSets/deallocate/action",
    "Microsoft.Compute/virtualMachineScaleSets/*/read"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": ["/subscriptions/<your_subscription_id>"]
}
```

```bash
az role definition create --role-definition custom_role.json
```

Asignar:

```bash
az role assignment create --assignee <user_principal_name_or_object_id> --role "VM App Gateway VMSS Operator" --scope <scope>
```

Parece que los roles creados pueden tardar en aparecer en la web, pero usando la cli pude asginarlos sin problemas.

# Obtener los permisos asociado a una Service Principal

```bash
az role assignment list --assignee <ID> --output table --all
```

Para todas las subscripciones:

```bash
for i in $(az account list --all | jq '.[].id' -r); do
  echo "Subscription $i"
  az role assignment list --assignee 1426cabc-bb99-44f8-9f3d-31c299ad1c99 --output table --all --subscription $i
  echo "---"
done
```
