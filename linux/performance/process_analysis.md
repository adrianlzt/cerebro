https://www.brainware.ro/2016/12/debugging-interview-pointers/
Analizar si un proceso esta siendo limitado por CPU o por disco.

Generalmente un proceso pasará la mayor parte de su tiempo en estado "S" (sleep).

El proceso no suele ejecutar todo el rato la misma operación, por lo tanto puede que en algunos momentos esté limitado por cpu y en otros por disco.

cat /proc/PID/status | grep "ctxt_switches"
voluntary_ctxt_switches:  355631
nonvoluntary_ctxt_switches: 6136984
Si tenemos muchos más nonvoluntary_ctxt_switches que voluntary_ctxt_switches probablemente tenemos un proceso que consume mucha CPU.

cat /proc/7950/sched | egrep "nr_involuntary_switches|nr_switches" | awk '{print $3;}' | xargs echo | awk '{print $2*100/$1 "% de switches involuntarios";}'

Un proceso que solo consuma CPU al 100% -> 99%
Un apache muy cargado: 57%
icinga con 40k services: 43%
splunk-forwarder, sin mucho trabajo: 0.008%
stress --io: 0.02%


High IO
cat /proc/PID/sched | grep se.statistics.iowait_sum
Es un valor absoluto, habŕa que compararlo con el running time del proceso y con otros procesos.



# Pruebas con stress

## CPU - 1 proceso
stress --cpu 1

ps status: R

/proc/PID/io
 todo a 0

/proc/PID/sched
nr_voluntary_switches:        1
nr_involuntary_switches:  19675


# cat sched
stress (7950, #threads: 1)
-------------------------------------------------------------------
se.exec_start                                :    6218291951.626115
se.vruntime                                  :       8483530.860314
se.sum_exec_runtime                          :       2980522.194212
se.nr_migrations                             :                    0
nr_switches                                  :                25712
nr_voluntary_switches                        :                    1
nr_involuntary_switches                      :                25711
se.load.weight                               :                 1024
policy                                       :                    0
prio                                         :                  120
clock-delta                                  :                   64
mm->numa_scan_seq                            :                    0
numa_migrations, 0
numa_faults_memory, 0, 0, 1, 0, -1
numa_faults_memory, 1, 0, 0, 0, -1


# cat status
Name:   stress
State:  R (running)
Tgid:   7950
Ngid:   0
Pid:    7950
PPid:   7949
TracerPid:      0
Uid:    0       0       0       0
Gid:    0       0       0       0
FDSize: 64
Groups: 0
VmPeak:     7256 kB
VmSize:     7256 kB
VmLck:         0 kB
VmPin:         0 kB
VmHWM:        96 kB
VmRSS:        96 kB
RssAnon:              96 kB
RssFile:               0 kB
RssShmem:              0 kB
VmData:       52 kB
VmStk:       136 kB
VmExe:        20 kB
VmLib:      2904 kB
VmPTE:        24 kB
VmSwap:        0 kB
Threads:        1
SigQ:   0/3817
SigPnd: 0000000000000000
ShdPnd: 0000000000000000
SigBlk: 0000000000000000
SigIgn: 0000000000000000
SigCgt: 0000000000000000
CapInh: 0000000000000000
CapPrm: 0000001fffffffff
CapEff: 0000001fffffffff
CapBnd: 0000001fffffffff
CapAmb: 0000000000000000
Seccomp:        0
Cpus_allowed:   1
Cpus_allowed_list:      0
Mems_allowed:   00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000001
Mems_allowed_list:      0
voluntary_ctxt_switches:        1
nonvoluntary_ctxt_switches:     28787



## IO - 1 proceso
stress --io 1

htop cpu 100%
top: cpu sys 100%
status: D

/proc/PID/io
  todo a 0 ¿?

/proc/PID/sched
stress (8109, #threads: 1)
-------------------------------------------------------------------
se.exec_start                                :    6218932880.339973
se.vruntime                                  :       9045237.212290
se.sum_exec_runtime                          :         56810.055035
se.nr_migrations                             :                    0
nr_switches                                  :                57654
nr_voluntary_switches                        :                57638
nr_involuntary_switches                      :                   16
se.load.weight                               :                 1024
policy                                       :                    0
prio                                         :                  120
clock-delta                                  :                  131
mm->numa_scan_seq                            :                    0
numa_migrations, 0
numa_faults_memory, 0, 0, 1, 0, -1
numa_faults_memory, 1, 0, 0, 0, -1


/proc/PID/status
Name:   stress
State:  D (disk sleep)
Tgid:   8109
Ngid:   0
Pid:    8109
PPid:   8108
TracerPid:      0
Uid:    0       0       0       0
Gid:    0       0       0       0
FDSize: 64
Groups: 0
VmPeak:     7256 kB
VmSize:     7256 kB
VmLck:         0 kB
VmPin:         0 kB
VmHWM:        96 kB
VmRSS:        96 kB
RssAnon:              96 kB
RssFile:               0 kB
RssShmem:              0 kB
VmData:       52 kB
VmStk:       136 kB
VmExe:        20 kB
VmLib:      2904 kB
VmPTE:        24 kB
VmSwap:        0 kB
Threads:        1
SigQ:   0/3817
SigPnd: 0000000000000000
ShdPnd: 0000000000000000
SigBlk: 0000000000000000
SigIgn: 0000000000000000
SigCgt: 0000000000000000
CapInh: 0000000000000000
CapPrm: 0000001fffffffff
CapEff: 0000001fffffffff
CapBnd: 0000001fffffffff
CapAmb: 0000000000000000
Seccomp:        0
Cpus_allowed:   1
Cpus_allowed_list:      0
Mems_allowed:   00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,000000
00,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000001
Mems_allowed_list:      0
voluntary_ctxt_switches:        128641
nonvoluntary_ctxt_switches:     36


## IO disco - stress
stress -d 1

status, casi siempre en D
top:
  proc cpu ~ 15%
  sys cpu: 15% sys, 73% wait

/proc/PID/io
  valores muy altos de write_bytes

3.48235% de switches involuntarios



## IO disco - spew
spew -i 0 10M FILE

top:
  proc cpu ~ 50%
  sys cpu: 47% sys, 47% wait

/proc/PID/io
valores muy altos de wchar (11GB)
syscw 24.456.702

Estado pasando entre D (disk sleep) y R (running)

69.7315% de switches involuntarios

iotop: IO ~50%, Disk write: ~90MB/s

iostat: nos da cada segundo cpu (user, nice, sys, iowait, steal, idle) y las operaciones por segundo, escrituras y lecturas de los discos.


perf para ver L1 cache misses.
Un programa bien diseñado deberia tener pocos L1 cache misses
https://youtu.be/0IQlpFWTFbM?t=796
