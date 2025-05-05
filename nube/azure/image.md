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
