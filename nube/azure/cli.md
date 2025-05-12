<https://learn.microsoft.com/en-us/cli/azure/install-azure-cli>
<https://github.com/Azure/azure-cli>
python

En arch aur/azure-cli

Comprobar si está instalada y la versión:

```bash
az version
```

Para loguearnos

```bash
az login
```

Si queremos que nos aparezca el menú para seleccionar la subscripción:

```bash
az config set core.login_experience_v2=on
```

Login con una ServicePrincipal:

```bash
az login --service-principal -u 694 -p "RuB" --tenant 31f34
```

Usuario actual:

```bash
az ad signed-in-user show
```

Suscripciones:

```bash
az account list -o table
```

Cambiar la suscripción por defecto:

```bash
az account set --subscription FooBar
```

# Configuración

~/.azure/config
En ~/.azure habrá logs, ficheros con los tokens, etc

Para modificar la config usar la cli:
az config set core.output=table

# Parámetros generales

<https://learn.microsoft.com/en-us/cli/azure/azure-cli-learn-bash>

--output yaml/json/table/tsv
-o json
--query name
--query user.name
--query "[].{subscription_id:id, name:name, isDefault:isDefault}"

# VMs

<https://learn.microsoft.com/en-us/cli/azure/choose-the-right-azure-command-line-tool#:~:text=Manage%20Azure%20Virtual,Expand%20table>

az vm list
az vm show --resource-group myResourceGroup --name myVMnam

Para ver la IP pública
az vm show --resource-group myResourceGroup --name myVMnam --show-details

az vm list-ip-addresses -n appliance --query "[].virtualMachine.network.publicIpAddresses[].ipAddress" -o tsv

## SSH

<https://learn.microsoft.com/en-us/cli/azure/ssh?view=azure-cli-latest>
az ssh vm --resource-group testlink_group --name testlink

Podemos generar ficheros de config ssh:
az ssh config --resource-group myResourceGroup --name myMachine --local-user username --certificate-file cert --private-key-file key --file ./sshconfig
ssh -F ./sshconfig MyResourceGroup-myMachine-username

Por defecto el usuario que crea azure es linux es "azureuser".

# Resource groups

Borrar:
az group delete --name NAME

# Subir un fichero a un storage

az storage azcopy blob upload -c source-images --account-name iometricsappliance -s Rocky-9-Azure-Base-9.3-20231113.0.x86_64.vhd
