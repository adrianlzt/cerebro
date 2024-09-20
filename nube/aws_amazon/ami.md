AMIs son las imágenes de SOs que tiene amazon.

Podemos crear una AMI de una de nuestras máquinas, pinchando sobre una máquina boton derecho, create image.
Puede tardar algún minuto en crearla.

Para meter una AMI en nuestra consola (Me parece que esto no va así):
  Entramos en https://aws.amazon.com/marketplace/
  Buscamos la que nos guste (si tiene 'Free Usage Tier Eligible' podremos usarlo con la parte gratuita de amazon)
  Pinchamos sobre: Launch with EC2 Console
  Y en la region que la queramos, le damos a 'Launch with EC2 Console'
  Esto nos abre la consola, y nos muestra las caracterísitcas de la AMI.
    Un detalle importante es tener el root device type: EBS (ver más abajo)

AMIs are accessible only from the region in which they were created. To see the AMIs you own in another region, use the region selector to change to that region. To copy AMIs from one region to another, see Copying AMIs.

Root Device Type:
  Instance Store:
	Tamaño limitado y almacenada en S3
	Complicado actualizarla
	Se pierden los cambios no almacenados en un EBS
	Se puede migrar la imagen entre regiones
	Lenta al arrancar si la imagen es grande

  EBS-Backend:
	Se puede iniciar/detener la instancia
	Se puede cambiar el tipo de instancia
	La imagen es un snapshot del volumen raíz EBS almacenado en S3
	No se puede migrar entre regiones


AMIs oficiales de centos
http://wiki.centos.org/Cloud/AWS
