# Acceso remoto
Si vamos a la Storage account / Networking, podemos ver desde donde puede accederse (público, ciertas ips/redes o desactivado).

# UI
https://azure.microsoft.com/en-us/products/storage/storage-explorer/

Arch linux: aur/azure-storage-explorer


# CLI

## azcopy
https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&bc=%2Fazure%2Fstorage%2Fblobs%2Fbreadcrumb%2Ftoc.json

No la he usado

## az
https://learn.microsoft.com/fr-fr/cli/azure/storage?view=azure-cli-latest
https://learn.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-portal?tabs=azure-cli

### File shares

az storage share list --account-name ACCNAME
az storage share show --account-name ACCNAME --name data --output yaml

Crear directorio
az storage directory create --account-name aaagroupb79c --share-name data -n foo

Subir un directorio (sube el contenido de foo):
az storage file upload-batch --account-name groupb79c --destination data --source foo/
