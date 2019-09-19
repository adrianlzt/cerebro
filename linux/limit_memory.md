Si queremos simular que tenemos menos memoria:

mkdir shm1
mount -t tmpfs tmpfs shm1/
cd shm1; fallocate -l 10G 10G.file


También podemos arrancar linux con menos memoria:
boot with mem=nn[KMG]


Programa python para consumir 1GB
python -c "x=(1*1024*1024*1024/8)*(0,); raw_input()"
