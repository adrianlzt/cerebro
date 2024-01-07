https://git-lfs.com/
Large files storage

Arch linux
git-lfs

Comprobar si lo tenemos instalado (nos dara un error de comando no encontrado si no):
git lfs install

Seleccionar que ficheros deben almacenarse en git lfs
git lfs track "*.wav"
Ver lo que tenemos "trackeado"
git lfs track

Esos datos se almacenan en el fichero .gitattributes, que debemos comitear.

Una vez configurado el "track", simplemente añadiremos los ficheros (git add).
Al hacer el push veremos un "Uploading LFS object"

Ver que ficheros están en lfs
git lfs ls-files


Si queremos mover ficheros ya existentes, mirar
git lfs migrate


Si queremos hacer un "git status" pero solo para lfs:
git lfs status



Los servidores de git deben implementar el soporte a LFS.
También se puede hacer configuración manual.
https://github.com/git-lfs/git-lfs/blob/main/docs/api/server-discovery.md
