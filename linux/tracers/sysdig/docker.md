docker run -it --rm --name sysdig --net=host --privileged -v /var/run/docker.sock:/host/var/run/docker.sock -v /dev:/host/dev -v /proc:/host/proc:ro -v /boot:/host/boot:ro -v /lib/modules:/host/lib/modules:ro -v /usr:/host/usr:ro sysdig/sysdig

Con esto podemos tracear el host donde corre el container

Puede tardar unos segundos en arrancar (>10")



Si no tenemos conex a internet para bajar el modulo del kernel.
Arrancar el container. Fallará el bajarse el modulo.
Se lo copiamos desde fuera (docker cp)
Meterlo en el container en:
/root/.sysdig/sysdig-probe-0.19.1-x86_64-3.10.0-514.26.2.el7.x86_64-467105748c37a778c95a72a8bc027649.ko
Arrancar el entrypoint original: ./docker-entrypoint.sh


# RancherOS
$ sudo ros service enable kernel-headers
$ sudo ros service up kernel-headers
$ docker run -it --rm --name sysdig --privileged -v /var/run/docker.sock:/host/var/run/docker.sock -v /dev:/host/dev -v /proc:/host/proc:ro -v /boot:/host/boot:ro -v /lib/modules:/host/lib/modules:ro -v /usr:/host/usr:ro sysdig/sysdig



# Kubernetes
https://sysdig.com/blog/tracing-in-kubernetes-kubectl-capture-plugin/
wget https://raw.githubusercontent.com/sysdiglabs/kubectl-capture/master/kubectl-capture -O ~/bin/kubectl-capture
  podemos quitarle los "> /dev/null" del script si queremos ver que está pasando por debajo.

kubectl capture rook-ceph-operator-68796ffcfd-2c2j2 -M 3 --snaplen 256 -ns rook-ceph

gunzip capture*.gz
sysdig-capture
  abrir el .scap
