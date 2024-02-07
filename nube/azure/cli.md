https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
https://github.com/Azure/azure-cli
  python

En arch aur/azure-cli

Comprobar si está instalada y la versión:
az version

Para loguearnos
az login

Suscripciones:
az account list -o table

Cambiar la suscripción por defecto:
az account set --subscription FooBar

# Configuración
~/.azure/config
En ~/.azure habrá logs, ficheros con los tokens, etc

Para modificar la config usar la cli:
az config set core.output=table

# Parámetros generales
https://learn.microsoft.com/en-us/cli/azure/azure-cli-learn-bash

--output yaml/json/table/tsv
-o json
--query name
--query user.name
--query "[].{subscription_id:id, name:name, isDefault:isDefault}"



# VMs
https://learn.microsoft.com/en-us/cli/azure/choose-the-right-azure-command-line-tool#:~:text=Manage%20Azure%20Virtual,Expand%20table

az vm list
az vm show --resource-group myResourceGroup --name myVMnam

Para ver la IP pública
az vm show --resource-group myResourceGroup --name myVMnam --show-details

## SSH
https://learn.microsoft.com/en-us/cli/azure/ssh?view=azure-cli-latest
az ssh vm --resource-group testlink_group --name testlink

Podemos generar ficheros de config ssh:
az ssh config --resource-group myResourceGroup --name myMachine --local-user username --certificate-file cert --private-key-file key --file ./sshconfig
ssh -F ./sshconfig MyResourceGroup-myMachine-username

Por defecto el usuario que crea azure es linux es "azureuser".


# Resource groups
Borrar:
az group delete --name NAME
