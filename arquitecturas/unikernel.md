a unikernel is an application that runs entirely in the microprocessor’s privileged mode. (The exact nomenclature varies; on x86 this would be running at Ring 0.) That is, in a unikernel there is no application at all in a traditional sense; instead, application functionality has been pulled into the operating system kernel. (The idea that there is “no OS” serves to mislead; it is not that there isn’t an operating system but rather that the application has taken on the hardware-interfacing responsibilities of the operating system — it is “all OS”, if a crude and anemic one.)


https://news.ycombinator.com/item?id=15376764
https://github.com/atmanos/atmanos

Bryan Cantrill has a great post on unikernel models (https://www.joyent.com/blog/unikernels-are-unfit-for-production)
From my read, the benefits do not outweigh the costs. If you want light weight microservices, OS level virtualization is the way to go.



Brenden Gregg also has a great post on unikernel models (http://www.brendangregg.com/blog/2016-01-27/unikernel-profiling-from-dom0.html)
From my read, it counters Bryan Cantrill's claim that, "unikernels are undebuggable".
From personal experience I'm also quite certain Bryan Cantrill's claim is spurious in that regard, as I've used both debugging and tracing facilities w/ LING unikernels to assess a number of runtime and clustering issues.


Somewhat related: for anyone who is interested in unikernel development, there is a new proposed project called Unicore under the Xen Project umbrella.
That project aims to reduce the effort for porting applications to run in unikernels on different platforms (Xen, KVM and baremetal).
https://lists.xen.org/archives/html/xen-devel/2017-09/msg03680.html

