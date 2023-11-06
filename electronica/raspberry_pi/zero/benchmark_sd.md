Mirar ../sdcard.md
Orange Pi Zero2w

                                                        hdparam (read)     dd (write)       iozone rand read / write
SanDisk Extreme plus 32GB + OrangePi Zero2w             68                 54               9.8 / 5.7
SiliconPower elite 3D NAND 32GB + OrangePi Zero2w       65                 17               4.7 / 0.6
SanDisk Ultra 32GB + RasPi Zero2w                       22                 3                5.2 / 1.3

# microSD SanDisk Extreme plus 32GB
Esta mucho más rápida que la SiliconPower

```
Running hdparm test...

/dev/mmcblk0:
 Timing buffered disk reads: 204 MB in  3.02 seconds =  67.51 MB/sec

Running dd test...

51200+0 records in
51200+0 records out
419430400 bytes (419 MB, 400 MiB) copied, 7.74791 s, 54.1 MB/s

Running iozone test...
        Iozone: Performance Test of File I/O
                Version $Revision: 3.492 $
                Compiled for 64 bit mode.
                Build: linux-arm

        Run began: Sat Nov  4 14:57:05 2023

        Include fsync in write timing
        O_DIRECT feature enabled
        Auto Mode
        File size set to 102400 kB
        Record Size 4 kB
        Command line used: ./iozone -e -I -a -s 100M -r 4k -i 0 -i 1 -i 2
        Output is in kBytes/sec
        Time Resolution = 0.000001 seconds.
        Processor cache size set to 1024 kBytes.
        Processor cache line size set to 32 bytes.
        File stride size set to 17 * record size.
                                                              random    random     bkwd    record    stride
              kB  reclen    write  rewrite    read    reread    read     write     read   rewrite      read   fwrite frewrite    fread  freread
          102400       4     3087     3145    10337    10376     9761     5744

iozone test complete.

microSD card benchmark complete!
```


# SiliconPower elite 3D NAND 32GB
```
Running hdparm test...

/dev/mmcblk0:
 Timing buffered disk reads: 196 MB in  3.03 seconds =  64.76 MB/sec

Running dd test...

51200+0 records in
51200+0 records out
419430400 bytes (419 MB, 400 MiB) copied, 25.3193 s, 16.6 MB/s

Running iozone test...
        Iozone: Performance Test of File I/O
                Version $Revision: 3.492 $
                Compiled for 64 bit mode.
                Build: linux-arm

        Run began: Sat Nov  4 16:50:28 2023

        Include fsync in write timing
        O_DIRECT feature enabled
        Auto Mode
        File size set to 102400 kB
        Record Size 4 kB
        Command line used: ./iozone -e -I -a -s 100M -r 4k -i 0 -i 1 -i 2
        Output is in kBytes/sec
        Time Resolution = 0.000001 seconds.
        Processor cache size set to 1024 kBytes.
        Processor cache line size set to 32 bytes.
        File stride size set to 17 * record size.
                                                              random    random     bkwd    record    stride
              kB  reclen    write  rewrite    read    reread    read     write     read   rewrite      read   fwrite frewrite    fread  freread
          102400       4     1523     1547     4864     4746     4727      643

iozone test complete.

microSD card benchmark complete!
```


# SanDisk ultra 32GB
```
Running hdparm test...

/dev/mmcblk0:
 Timing buffered disk reads:  68 MB in  3.06 seconds =  22.26 MB/sec

Running dd test...

51200+0 records in
51200+0 records out
419430400 bytes (419 MB, 400 MiB) copied, 140.736 s, 3.0 MB/s

Running iozone test...
        Iozone: Performance Test of File I/O
                Version $Revision: 3.492 $
                Compiled for 64 bit mode.
                Build: linux-arm

        Run began: Mon Nov  6 08:02:58 2023

        Include fsync in write timing
        O_DIRECT feature enabled
        Auto Mode
        File size set to 102400 kB
        Record Size 4 kB
        Command line used: ./iozone -e -I -a -s 100M -r 4k -i 0 -i 1 -i 2
        Output is in kBytes/sec
        Time Resolution = 0.000001 seconds.
        Processor cache size set to 1024 kBytes.
        Processor cache line size set to 32 bytes.
        File stride size set to 17 * record size.
                                                              random    random     bkwd    record    stride
              kB  reclen    write  rewrite    read    reread    read     write     read   rewrite      read   fwrite frewrite    fread  freread
          102400       4      800     1401     6313     6535     5247     1326

iozone test complete.

microSD card benchmark complete!
```
