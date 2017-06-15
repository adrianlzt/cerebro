Perf
https://perf.wiki.kernel.org/index.php/Main_Page

This is the wiki page for the perf performance counters subsystem in Linux. Performance counters are CPU hardware registers that count hardware events such as instructions executed, cache-misses suffered, or branches mispredicted. They form a basis for profiling applications to trace dynamic control flow and identify hotspots.
perf provides rich generalized abstractions over hardware specific capabilities. Among others, it provides per task, per CPU and per-workload counters, sampling on top of these and source code event annotation.


Perf is natively supported in many popular Linux distributions, including Red Hat Enterprise Linux (since its version 6 released in 2010)[11] and Debian (since its Squeeze version released in 2011).

Available from Linux kernel version 2.6.31


perf_events is the main tracing tool for Linux users, its source is in the Linux kernel, and is usually added via a linux-tools-common package. Aka "perf", after its front end, which is typically used to trace & dump to a file (perf.data), which it does relatively efficiently (dynamic buffering), and then post-processeses that later.
It can do most of what ftrace can. It can't do function-flow walking, and is a bit less hackable (as it has better safety/error checking). But it can do profiling (sampling), CPU performance counters, user-level stack translation, and can consume debuginfo for line tracing with local variables. It also supports multiple concurrent users.
As with ftrace, it isn't kernel programmable yet, until perhaps eBPF support (patches have been proposed). If there's one tracer I'd recommend people learn, it'd be perf, as it can solve a ton of issues, and is relatively safe.


# Links
http://www.brendangregg.com/perf.html
http://www.brendangregg.com/blog/2015-02-27/linux-profiling-at-netflix.html
http://www.brendangregg.com/blog/2014-06-22/perf-cpu-sample.html
http://www.brendangregg.com/blog/2014-06-29/perf-static-tracepoints.html
http://www.brendangregg.com/blog/2014-07-01/perf-heat-maps.html
http://www.brendangregg.com/blog/2014-07-03/perf-counting.html
http://www.brendangregg.com/blog/2014-09-11/perf-kernel-line-tracing.html
http://www.brendangregg.com/blog/2015-02-26/linux-perf-off-cpu-flame-graph.html
