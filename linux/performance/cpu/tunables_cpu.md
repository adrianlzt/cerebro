TUNABLES CFS SCHEDULER
======================

---

- kernel.sched_autogroup_enabled = 1

```
"So, this patch only has an effect on people who build 
kernels from an xterm with make -j all day, and at the
same time want to watch a movie, from a player
they also start from a terminal, but from another one".
```

```
* Mejora mucho la latencia en desktop en ciertas 
condiciones (divide los procesos en autogroups y establece
fairness entre esos autogroups).
```

---

- kernel.sched_cfs_bandwidth_slice_us = 5000

```
For efficiency run-time is transferred between the global 
pool and CPU local "silos" in a batch fashion. This greatly
reduces global accounting pressure on large systems. 
The amount transferred each time such an update is required
is described as the "slice".

Larger slice values will reduce transfer overheads, while 
smaller values allow for more fine-grained consumption.
```

---

- kernel.sched_child_runs_first = 0

```
A freshly forked child runs before the parent continues 
execution. Setting this parameter to 1 is beneficial for an 
application in which the child performs an execution after
fork. For example make -j<NO_CPUS> performs better when
sched_child_runs_first is turned off. The default value is 0.
```

---

- kernel.sched_latency_ns = 18000000

```
Targeted preemption latency for CPU bound tasks. Increasing 
this variable increases a CPU bound task's timeslice. A task's
timeslice  is its weighted fair share of the scheduling period:
```

---

- kernel.sched_migration_cost_ns = 500000

```
Amount of time after the last execution that a task is 
considered to be “cache hot” in migration decisions.
A “hot” task is less likely to be migrated, so increasing
this variable reduces task migrations. The default value is
500000 (ns).

If the CPU idle time is higher than expected when there are 
runnable processes, try reducing this value. If tasks bounce
between CPUs or nodes too often, try increasing it.
```

---

- kernel.sched_min_granularity_ns = 2250000

```
Minimal preemption granularity for CPU bound tasks.
The default value is 4000000 (ns).
```

---

- kernel.sched_nr_migrate = 32

```
Controls how many tasks can be moved across processors 
through migration software interrupts (softirq). If a
large number of tasks is created by SCHED_OTHER policy,
they will all be run on the same processor. The default
value is 32. Increasing this value gives a performance 
boost to large SCHED_OTHER threads at the expense of
increased latencies for real-time tasks.
```

---

- kernel.sched_rr_timeslice_ms = 25

```
Size of the round-robin time quantum.
```

---

- kernel.sched_rt_period_us = 1000000

```
Period over which real-time task bandwidth enforcement is 
measured. The default value is 1000000 (µs).
```

---

- kernel.sched_rt_runtime_us = 950000

```
Quantum allocated to real-time tasks during sched_rt_period_us.
Setting to -1 disables RT bandwidth enforcement. By default, RT
tasks may consume 95%CPU/sec, thus leaving 5%CPU/sec or 0.05s to
be used by SCHED_OTHER tasks.
```

---

- kernel.sched_wakeup_granularity_ns = 3000000

```
The wake-up preemption granularity. Increasing this 
variable reduces wake-up preemption, reducing disturbance
of compute bound tasks. Lowering it improves
wake-up latency and throughput for latency critical tasks, 
particularly when a short duty cycle load component must compete
with CPU bound components. The default value is 5000000 (ns).
```
