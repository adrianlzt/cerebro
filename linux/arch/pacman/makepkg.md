Una vez tenemos los fuentes (mirar yaourt.md)

1- Download and extract files, run the prepare() function, but do not build them
makepkg --nobuild

Aqui podemos tocar el codigo fuente.
Aplicar un parche por ejemplo:


2- Instalar con los fuentes que tengamos en el directorio actual
makepkg --noextract

    Si queremos pasar flags para el build (ejemplo para usar paralelización en el build):
    MAKEFLAGS=-j16 makepkg

3.- Instalar:
sudo pacman -U paquete.tar.xz
