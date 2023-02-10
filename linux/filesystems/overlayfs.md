Ejemplo haciendo un CoW
https://gist.github.com/detunized/7c8fc4c37b49c5475e68ef9574587eee

mkdir folder-ro folder upper work overlay
echo "fichero original" > folder-ro/fichero
sudo mount -t overlay overlay -o lowerdir=folder-ro,upperdir=upper,workdir=work folder

cd folder/
vemos lo que hay en folder-ro.
Si lo modificamos, no se modifica folder-ro, si no en la estructura intermedia.
