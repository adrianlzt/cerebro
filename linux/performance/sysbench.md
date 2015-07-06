http://sysbench.sourceforge.net/
http://imysql.com/wp-content/uploads/2014/10/sysbench-manual.pdf
http://wiki.mikejung.biz/Sysbench#Sysbench_Fileio_Options
https://www.howtoforge.com/how-to-benchmark-your-system-cpu-file-io-mysql-with-sysbench

SysBench is a modular, cross-platform and multi-threaded benchmark tool for evaluating OS parameters that are important for a system running a database under intensive load.


# CentOS
yum install sysbench

# CPU
sysbench --test=cpu --cpu-max-prime=20000 run

# File IO
Create a test file that is much bigger than your RAM (because otherwise the system will use RAM for caching which tampers with the benchmark results)
sysbench --test=fileio --file-total-size=150G prepare
sysbench --test=fileio --file-total-size=150G --file-test-mode=rndrw --init-rng=on --max-time=300 --max-requests=0 run
  The important number is the Kb/sec value:

Si queremos hacer pruebas con más ficheros:
sysbench --test=fileio --file-total-size=14G --file-num=50000  prepare
  esto dividirá 14G en 50.000 ficheros
  50000 files, 293Kb each, 14335Mb total
  Me da error 24, que creo que es too many open files

sysbench --test=fileio cleanup


SysBench performs checksums validation on all data read from the disk. On each write operation the block is filled with random values, then the checksum is calculated and stored in the block along with the offset of this block within a file. On each read operation the block is validated by comparing the stored offset with the real offset, and the stored checksum with the real calculated checksum.

seqwr sequential write
seqrewr sequential rewrite
seqrd sequential read
rndrd random read
rndwr random write
rndrw combined random read/write



# MySQL
sysbench --test=oltp --oltp-table-size=1000000 --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword prepare
sysbench --test=oltp --oltp-table-size=1000000 --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword --max-time=60 --oltp-read-only=on --max-requests=0 --num-threads=8 run


sysbench --batch --batch-delay=5 --test=threads run
This will run SysBench in a threads test mode, with the current values of
minimum, average, maximum and percentile for request execution times
printed every 5 seconds.
