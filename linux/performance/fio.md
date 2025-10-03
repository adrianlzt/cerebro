fio --size=500M --bs=64k --rw=randread --ioengine=sync --name=FILE

Nos permite decidir que tipo de patrón seguir al leer o escribir.
No nos da info de una carga de trabajo real.

Se puede definir O_DIRECT para evitar cache y readahead.-

gfio GUI

Simulando una carga de zabbix en un postgres:

```bash
fio --name=reproduce-iostat-load --filename=fio_test_file --size=10G --rw=randrw --rwmixwrite=97 --bsrange=4k-32k --ioengine=libaio --direct=1 --numjobs=8 --iodepth=8 --runtime=120s --group_reporting
```

En un disco de Azure Premium SSD v2 LRS con 80k IOPS y 1200MiB/s

```bash
$ fio --name=reproduce-iostat-load --filename=fio_test_file --size=10G --rw=randrw --rwmixwrite=97 --bsrange=4k-32k --ioengine=libaio --direct=1 --numjobs=8 --iodepth=8 --runtime=120s --group_reporting
reproduce-iostat-load: (g=0): rw=randrw, bs=(R) 4096B-32.0KiB, (W) 4096B-32.0KiB, (T) 4096B-32.0KiB, ioengine=libaio, iodepth=8
...
fio-3.23
Starting 8 processes
reproduce-iostat-load: Laying out IO file (1 file / 10240MiB)
Jobs: 1 (f=1): [_(4),m(1),_(3)][100.0%][r=11.0MiB/s,w=360MiB/s][r=1077,w=35.0k IOPS][eta 00m:00s]
reproduce-iostat-load: (groupid=0, jobs=8): err= 0: pid=28538: Fri Oct  3 08:33:20 2025
  read: IOPS=2117, BW=28.1MiB/s (29.5MB/s)(2463MiB/87485msec)
    slat (nsec): min=2000, max=1301.8k, avg=4778.68, stdev=6979.91
    clat (usec): min=179, max=54615, avg=1426.11, stdev=3989.56
     lat (usec): min=182, max=54619, avg=1431.00, stdev=3989.55
    clat percentiles (usec):
     |  1.00th=[  265],  5.00th=[  359], 10.00th=[  420], 20.00th=[  594],
     | 30.00th=[  693], 40.00th=[  750], 50.00th=[  832], 60.00th=[  906],
     | 70.00th=[  963], 80.00th=[ 1004], 90.00th=[ 1057], 95.00th=[ 1172],
     | 99.00th=[26346], 99.50th=[32637], 99.90th=[41681], 99.95th=[44303],
     | 99.99th=[49021]
   bw (  KiB/s): min=18456, max=44384, per=100.00%, avg=29246.64, stdev=687.72, samples=1375
   iops        : min= 1664, max= 2731, avg=2146.62, stdev=24.94, samples=1375
  write: IOPS=68.4k, BW=908MiB/s (952MB/s)(77.6GiB/87485msec); 0 zone resets
    slat (nsec): min=1900, max=2355.4k, avg=4600.30, stdev=5538.46
    clat (usec): min=24, max=51957, avg=875.09, stdev=1117.37
     lat (usec): min=166, max=51961, avg=879.81, stdev=1117.42
    clat percentiles (usec):
     |  1.00th=[  217],  5.00th=[  293], 10.00th=[  594], 20.00th=[  685],
     | 30.00th=[  734], 40.00th=[  783], 50.00th=[  848], 60.00th=[  914],
     | 70.00th=[  963], 80.00th=[ 1004], 90.00th=[ 1057], 95.00th=[ 1106],
     | 99.00th=[ 1287], 99.50th=[ 1565], 99.90th=[22938], 99.95th=[29492],
     | 99.99th=[38536]
   bw (  KiB/s): min=707192, max=1281176, per=100.00%, avg=943646.99, stdev=19256.06, samples=1375
   iops        : min=57842, max=76258, avg=69293.34, stdev=377.90, samples=1375
  lat (usec)   : 50=0.01%, 100=0.01%, 250=2.92%, 500=4.32%, 750=26.90%
  lat (usec)   : 1000=44.42%
  lat (msec)   : 2=20.98%, 4=0.10%, 10=0.10%, 20=0.11%, 50=0.16%
  lat (msec)   : 100=0.01%
  cpu          : usr=2.62%, sys=4.98%, ctx=4107772, majf=1, minf=135
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=100.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.1%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=185267,5980576,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=8

Run status group 0 (all jobs):
   READ: bw=28.1MiB/s (29.5MB/s), 28.1MiB/s-28.1MiB/s (29.5MB/s-29.5MB/s), io=2463MiB (2582MB), run=87485-87485msec
  WRITE: bw=908MiB/s (952MB/s), 908MiB/s-908MiB/s (952MB/s-952MB/s), io=77.6GiB (83.3GB), run=87485-87485msec

Disk stats (read/write):
  sdf: ios=185256/5980313, merge=0/8, ticks=262673/5127270, in_queue=5389944, util=100.00%
```

En un disco de Azure Premium SSD v2 LRS con 3k IOPS y 125MiB/s

```bash
$ fio --name=reproduce-iostat-load --filename=fio_test_file --size=10G --rw=randrw --rwmixwrite=97 --bsrange=4k-32k --ioengine=libaio --direct=1 --numjobs=8 --iodepth=8 --runtime=120s --group_reporting
reproduce-iostat-load: (g=0): rw=randrw, bs=(R) 4096B-32.0KiB, (W) 4096B-32.0KiB, (T) 4096B-32.0KiB, ioengine=libaio, iodepth=8
...
fio-3.23
Starting 8 processes
reproduce-iostat-load: Laying out IO file (1 file / 10240MiB)
Jobs: 5 (f=0): [f(2),_(1),E(1),f(1),E(1),f(2)][100.0%][r=1605KiB/s,w=48.6MiB/s][r=87,w=2841 IOPS][eta 00m:00s]
reproduce-iostat-load: (groupid=0, jobs=8): err= 0: pid=28929: Fri Oct  3 08:38:02 2025
  read: IOPS=95, BW=1686KiB/s (1726kB/s)(198MiB/120021msec)
    slat (usec): min=2, max=124, avg=16.92, stdev=11.93
    clat (usec): min=324, max=66182, avg=20355.34, stdev=3087.50
     lat (usec): min=329, max=66187, avg=20372.52, stdev=3088.71
    clat percentiles (usec):
     |  1.00th=[ 5080],  5.00th=[20055], 10.00th=[20317], 20.00th=[20579],
     | 30.00th=[20579], 40.00th=[20841], 50.00th=[20841], 60.00th=[20841],
     | 70.00th=[21103], 80.00th=[21103], 90.00th=[21365], 95.00th=[21627],
     | 99.00th=[21890], 99.50th=[21890], 99.90th=[31327], 99.95th=[47449],
     | 99.99th=[63177]
   bw (  KiB/s): min=  108, max= 7449, per=100.00%, avg=1689.50, stdev=113.35, samples=1908
   iops        : min=    9, max=  413, avg=93.11, stdev= 5.80, samples=1908
  write: IOPS=3040, BW=52.3MiB/s (54.8MB/s)(6273MiB/120021msec); 0 zone resets
    slat (usec): min=2, max=113, avg=11.86, stdev= 9.87
    clat (usec): min=168, max=66249, avg=20389.63, stdev=2983.83
     lat (usec): min=173, max=66254, avg=20401.74, stdev=2984.46
    clat percentiles (usec):
     |  1.00th=[ 5080],  5.00th=[20055], 10.00th=[20317], 20.00th=[20579],
     | 30.00th=[20579], 40.00th=[20841], 50.00th=[20841], 60.00th=[21103],
     | 70.00th=[21103], 80.00th=[21365], 90.00th=[21365], 95.00th=[21627],
     | 99.00th=[21890], 99.50th=[21890], 99.90th=[26608], 99.95th=[43779],
     | 99.99th=[57410]
   bw (  KiB/s): min=45660, max=219996, per=100.00%, avg=53570.98, stdev=1793.26, samples=1912
   iops        : min= 2819, max=12075, avg=3042.83, stdev=97.81, samples=1912
  lat (usec)   : 250=0.01%, 500=0.09%, 750=0.01%, 1000=0.02%
  lat (msec)   : 2=0.02%, 4=0.01%, 10=3.25%, 20=0.82%, 50=95.74%
  lat (msec)   : 100=0.03%
  cpu          : usr=0.27%, sys=0.55%, ctx=211664, majf=0, minf=132
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=100.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.1%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=11500,364966,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=8

Run status group 0 (all jobs):
   READ: bw=1686KiB/s (1726kB/s), 1686KiB/s-1686KiB/s (1726kB/s-1726kB/s), io=198MiB (207MB), run=120021-120021msec
  WRITE: bw=52.3MiB/s (54.8MB/s), 52.3MiB/s-52.3MiB/s (54.8MB/s-54.8MB/s), io=6273MiB (6578MB), run=120021-120021msec

Disk stats (read/write):
    dm-0: ios=11487/364419, merge=0/0, ticks=233168/7406732, in_queue=7639900, util=100.00%, aggrios=11500/364974, aggrmerge=0/0, aggrticks=233805/7421821, aggrin_queue=7655625, aggrutil=100.00%
  sdc: ios=11500/364974, merge=0/0, ticks=233805/7421821, in_queue=7655625, util=100.00%
```
