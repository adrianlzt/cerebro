https://portal.vericoin.info/wp-content/uploads/2017/06/Install-Verium-CPU-Miner-Linux.pdf.pdf
http://resources.vericoin.info/wp-content/uploads/Verium-Solo-Mining-Guide.pdf
https://vrm2.poolinat0r.com/index.php?page=gettingstarted
https://vrm.mining-pool.ovh/index.php?page=gettingstarted

Uno de los programas para minar (con Dockerfile)
git clone https://github.com/JayDDee/cpuminer-opt
docker build -t cpuminer-opt:latest .
el build hace falta hacerlo en el ordenador donde vayamos a ejecutarlo, porque meterá las "CPU features" que vea. Ejemplo: SW features: SSE2.
docker run --rm -it cpuminer-opt:latest -a scrypt:1048576 -o stratum+tcp://eu.vrm.mining-pool.ovh:3032 -u Weblogin.WorkerName -p WorkerPassword


Note: cpuminer-opt does not support getwork so won't work for solo mining, use
https://github.com/effectsToCause/veriumMiner
