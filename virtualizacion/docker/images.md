Podemos crear una imagen también a partir de un .tar con import
http://docs.docker.io/en/latest/commandline/command/import/

cat exampleimage.tgz | sudo docker import - exampleimagelocal


Esto es util junto con el comando export, que nos exporta un container a un .tar
docker export CONTAINER


Podríamos sacar un container a un .tar, hacer las modificaciones que necesitásemos, y generar una imagen a partir de ese tar modificado.
