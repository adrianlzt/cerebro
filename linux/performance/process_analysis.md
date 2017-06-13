https://www.brainware.ro/2016/12/debugging-interview-pointers/
Analizar si un proceso esta siendo limitado por CPU o por disco.

Generalmente un proceso pasará la mayor parte de su tiempo en estado "S" (sleep).

El proceso no suele ejecutar todo el rato la misma operación, por lo tanto puede que en algunos momentos esté limitado por cpu y en otros por disco.

cat /proc/PID/status | grep "ctxt_switches"
voluntary_ctxt_switches:  355631
nonvoluntary_ctxt_switches: 6136984

Si tenemos muchos más nonvoluntary_ctxt_switches que voluntary_ctxt_switches probablemente tenemos un proceso que consume mucha CPU.


High IO
cat /proc/PID/sched | grep se.statistics.iowait_sum
Es un valor absoluto, habŕa que compararlo con el running time del proceso y con otros procesos.

