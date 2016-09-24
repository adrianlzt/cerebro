fdisk -H 224 -S 56 DEVICE

Garantiza alineamiento (cilindros de 224*56=12544) sectores multiplos de 128k para SSD y 4k para SATA
Los fdisk modernos y lo hacen ellos solos.



gdisk es la variante gráfica


Partición FAT32 es el código: b


# Imagen
También podemos aplicar fdisk contra una imagen raw (sacada de dd por ejemplo)
fdisk -l imagen.raw
  para mostrar las particiones
