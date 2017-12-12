system: running in kernel mode (also includes device drivers, kernel modules)
user: running in user-mode (application, without time waiting for network, disks, etc)
steal: When running in a virtualized environment, the hypervisor may “steal” cycles that are meant for your CPUs and give them to another, for various reasons.
IRQ and SoftIRQ: The kernel is servicing interrupt requests (IRQs)
Guest and Guest Nice: The process (a hypervisor) is running a virtual CPU. These numbers are already included in User and Nice.
nice: running code with nice below normal priority
iowait: disk/network
