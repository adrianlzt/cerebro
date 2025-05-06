<https://azuremarketplace.microsoft.com/en-uk/marketplace/apps/Microsoft.ImageVersion?tab=Overview>
<https://learn.microsoft.com/en-us/azure/virtual-machines/shared-image-galleries?tabs=vmsource%2Cazure-cli>

Explicado sencillamente.
La galería sería como un docker hub nuestro.
Las imágenes serían dicos con información y las image versión es cuando tageamos esos discos para poder usarlos.
Las image definition sería metadata con el SO, etc. A estos se asocian las distintas versiones disponibles.

gallery ----(tiene-varias)---> image-definition ---(tiene-varias)--> image-versions ---(asociada)---> image-disk

Image source: This is a resource that can be used to create an image version in a gallery. An image source can be an existing Azure VM that is either generalized or specialized, a managed image, a snapshot, a VHD or an image version in another gallery.

Gallery: Like the Azure Marketplace, a gallery is a repository for managing and sharing images and other resources, but you control who has access.

Image definition: Image definitions are created within a gallery and they carry information about the image and any requirements for using it to create VMs. This includes whether the image is Windows or Linux, release notes, and minimum and maximum memory requirements. It's a definition of a type of image.

Image version: An image version is what you use to create a VM when using a gallery. You can have multiple versions of an image as needed for your environment. Like a managed image, when you use an image version to create a VM, the image version is used to create new disks for the VM. Image versions can be used multiple times.

# Crear una VM a partir de otra VM copiando el disco

1. Hacer snapshot del disco
2. Crear una imagen a partir de ese snapshot
3. Usar esa disk image para levantar una nueva VM

Si tenemos problemas (tuve el caso de que la organización de donde partía el disco fue borrada y fallaba con "Organization is in deleted state"), podemos bajarnos el .vhdx e intentar borrar la metadata de esa asociación (creo que es el "purchasePlan" que se ve en el "JSON view" del disco).

Si queremos ver el contenido podemos montarlo con:

```bash
guestmount --add demo-bastion01-os-managed-disk-pruebas-adri.vhd --inspector --ro /mnt
```

Para subirlo, crear un "Managed disk" vacío, con tamaño suficiente:

```bash
az disk create --resource-group image-builder -n empty-disk-upload-vhdx --upload-type Upload --upload-size-bytes 10737418752
```

Obener el SAS token para poder subirlo:

```bash
az disk grant-access --resource-group image-builder -n empty-disk-upload-vhdx --duration-in-seconds 86400 --access-level Write
```

Subir el fichero .vhdx usando azcopy:

```bash
azcopy copy /home/foo/Downloads/os-managed-disk-pruebas.vhdx "https://<storage-account-name>.blob.core.windows.net/<container-name>/<blob-name>?<SAS-token>"
```

Terminar revocando el acceso de subida para cambiar el estado del disco:

```bash
az disk revoke-access --resource-group image-builder -n empty-disk-upload-vhdx
```

Comprobar que está en estado Unattached:

```bash
az disk show --resource-group image-builder -n empty-disk-upload-vhdx
```

Para poder usarlo como disco de OS: <https://learn.microsoft.com/en-us/azure/virtual-machines/attach-os-disk?tabs=portal#create-the-new-vm>

Crear un snapshot Full del disco.

Crear un managed disk: <https://portal.azure.com/#create/Microsoft.ManagedDisk>
En el source type poner snapshot y seleccionar la snapshot que acabamos de crear.

En el nuevo disco creado nos aparecerá el botón para poder crear una VM desde él.

TODO: no me ha funcionado. Tal vez haga falta tratar el .vhdx de alguna manera antes de subirlo.

# Plan

Specifies information about the marketplace image used to create the virtual machine.
This element is only used for marketplace images.
Before you can use a marketplace image from an API, you must enable the image for programmatic use.
In the Azure portal, find the marketplace image that you want to use and then click Want to deploy programmatically, Get Started ->.
Enter any required information and then click Save.
