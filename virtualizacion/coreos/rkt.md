https://coreos.com/rkt/docs/latest/using-rkt-with-systemd.html

En vez de funcionar como docker, un daemon principal con varios containers como subprocesos, rkt no usa ningún demonio.
Simplemente se ejecuta rkt con lo que queremos ejecutar.
Estos procesos son procesos de unix.
El control lo podemos llevar desde systemd.

# Conceptos
ACI: el formato de imagen

Pods: unidad básica, pueden ser varios containers compartiendo el mismo namespace de red (concepto de kubernetes)


# Instalacion
arch: pacman -Ss rkt

Parece que debe ejecutarse como root, al menos run: https://github.com/rkt/rkt/issues/1585


# Imagenes
Los nombres de las imagenes deben ser dominio/nombre:version

Para encontrar la imagen rkt preguntará a https://dominio/nombre?ac-discovery=1

## Listar
sudo rkt image list
