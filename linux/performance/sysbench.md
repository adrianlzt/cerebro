http://sysbench.sourceforge.net/

SysBench is a modular, cross-platform and multi-threaded benchmark tool for evaluating OS parameters that are important for a system running a database under intensive load.

https://www.howtoforge.com/how-to-benchmark-your-system-cpu-file-io-mysql-with-sysbench


# CPU
sysbench --test=cpu --cpu-max-prime=20000 run

# File IO
sysbench --test=fileio --file-total-size=150G prepare
sysbench --test=fileio --file-total-size=150G --file-test-mode=rndrw --init-rng=on --max-time=300 --max-requests=0 run
sysbench --test=fileio --file-total-size=150G cleanup

# MySQL
sysbench --test=oltp --oltp-table-size=1000000 --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword prepare
sysbench --test=oltp --oltp-table-size=1000000 --mysql-db=test --mysql-user=root --mysql-password=yourrootsqlpassword --max-time=60 --oltp-read-only=on --max-requests=0 --num-threads=8 run
