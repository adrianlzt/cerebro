https://registry.hub.docker.com/u/diogomonica/docker-bench-security/


Analizar containers:
https://www.open-scap.org
https://access.redhat.com/documentation/en/red-hat-enterprise-linux-atomic-host/version-7/cli-reference/#atomic_scan


Un container puede acceder al cgroup donde se encuentra:
cat /proc/self/cgroup
Esto se considera información sensible (al menos así lo comenta la guía de cgroups v2: https://www.kernel.org/doc/Documentation/cgroup-v2.txt)
