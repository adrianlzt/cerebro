http://www.iozone.org/

Parece que está un poco viejuno.

Nos bajamos un .c que hay que compilar.
En este dir: iozone3_434, version compilada para centos6.5_64

IOzone is a filesystem benchmark tool. The benchmark generates and measures a variety of file operations
Iozone is useful for performing a broad filesystem analysis of a vendor’s computer platform. The benchmark tests file I/O performance for the following operations:

iozone -a
  auto mode


# Testear
cd /path/en/nfs
touch iozone.tmp
iozone -i 1 -r 64k -s -3g -f iozone.tmp
  -i 1, run test read/re-read
  -r 64k, record size in Kb (tambien podemos usar 'm' o 'g'
  -s 3g, file size in Kb
  -f iozone.tmp, filename to use

con -i 1 parece que falla:
Error reading block 0 7f9a24900000
read: Success
 
Parece que todos los test que tengan que ver con read petan.
