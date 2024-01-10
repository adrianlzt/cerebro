# UI
https://azure.microsoft.com/en-us/products/storage/storage-explorer/

Arch linux: aur/azure-storage-explorer


# CLI
https://learn.microsoft.com/fr-fr/cli/azure/storage?view=azure-cli-latest
https://learn.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-portal?tabs=azure-cli

# File shares

az storage share list --account-name ACCNAME
az storage share show --account-name ACCNAME --name data --output yaml

Crear directorio
az storage directory create --account-name aaagroupb79c --share-name data -n foo
