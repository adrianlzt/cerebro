Tipos de almacenamiento en las instancias:

Unidades de disco efímeras:
	Disco de la máquina física
	El mejor I/O
	Si se apaga/bloquea la instancia perdemos los datos

EBS: 
	almacenamiento de red
	SAN
	Nos podemos asegurar unos IOPS garantizados
	RAID con varios EBSs
	Más lento que discos efímeros (raid 0 SW no soluciona cuellos de botella en la red)
	Snapshots incrementales guardados en S3


No usar NFS4 (genera mucho tráfico adicional en cada operación de stat u open). Mejor NFS3 o NFS2
