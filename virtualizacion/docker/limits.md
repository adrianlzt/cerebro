https://docs.docker.com/engine/admin/resource_constraints/

-m 100m
limita el container a 100m
si ejecutamos "free" veremos la ram del pc, pero mediante cgroups estará limitado.
Si se pasa, veremos el oom killer en el dmesg del docker host.
