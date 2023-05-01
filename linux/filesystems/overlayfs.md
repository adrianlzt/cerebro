Ejemplo haciendo un CoW
https://gist.github.com/detunized/7c8fc4c37b49c5475e68ef9574587eee

mkdir -p folder-ro folder overlay/{upper,workdir}
sudo mount -t overlay -o lowerdir=folder-ro,upperdir=overlay/upper,workdir=overlay/work overlay folder

Lo que tengamos en folder-ro es visibile y modificable en folder/, pero los cambios no se guardan, se almacenan en capas intermedias.


Montar un overlay sobre "/"
https://bbs.archlinux.org/viewtopic.php?pid=1966966#p1966966
sudo mount -t overlay -o index=off -o metacopy=off -o lowerdir=/,upperdir=overlay/upper,workdir=overlay/workdir overlay folder
