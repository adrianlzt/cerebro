https://portal.vericoin.info/wp-content/uploads/2017/06/Install-Verium-CPU-Miner-Linux.pdf.pdf
http://resources.vericoin.info/wp-content/uploads/Verium-Solo-Mining-Guide.pdf
https://vrm2.poolinat0r.com/index.php?page=gettingstarted

Uno de los programas para minar (con Dockerfile)
https://github.com/JayDDee/cpuminer-opt

./cpuminer-opt -a scrypt:1048576 -o stratum+tcp://eu2.poolinat0r.com:7103 -u Weblogin.WorkerName -p WorkerPassword


Note: cpuminer-opt does not support getwork so won't work for solo mining, use
https://github.com/effectsToCause/veriumMiner
