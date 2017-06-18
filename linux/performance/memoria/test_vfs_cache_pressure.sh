#!/bin/bash
#
echo "it requires at least 3GB free in /tmp"
sync
echo 3 > /proc/sys/vm/drop_caches
#dd if=/dev/zero of=/tmp/testfile count=1 bs=999M # Poner un tamaño para que llene la ram
fallocate -l 2G /tmp/testfile
sysctl -w vm.vfs_cache_pressure=100
echo "Executing find /, that's gonna take a while..."
find / > /dev/null # llena la slab
echo "OK. Copying huge file..."
cp /tmp/testfile /tmp/testfile2 # llena la cache de pagina, por eso el fichero debe tener un tamaño cercano al total de la ram (se vacia la slab, vfs_cache_pressure=100)
echo "Let's do find / again, checking how much time takes"
time find / > /dev/null # va a tardar porque hemos limpiado la memoria slab
sysctl -w vm.vfs_cache_pressure=50 # damos más importancia a los objetos de slab
echo "Executing find /, that's gonna take a while..."
find /  > /dev/null # llenamos la slab
echo "OK. Copying huge file..."
cp /tmp/testfile2 /tmp/testfile3 # ahora ya no se libera memoria slab
echo "Let's do find / again, checking how much time takes (it should be less than before one)"
time find / > /dev/null # ahora debería ser más rápido, porque tenemos los objetos en la memoria slab
rm -f /tmp/testfile /tmp/testfile2 /tmp/testfile3
