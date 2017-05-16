# Container
Montar Origin sobre un container privileged
This method is supported on Fedora, CentOS, and Red Hat Enterprise Linux (RHEL) hosts only.
https://docs.openshift.org/latest/getting_started/administrators.html#running-in-a-docker-container

docker run -d --name "origin" 
  --privileged --pid=host --net=host \
  -v /:/rootfs:ro -v /var/run:/var/run:rw -v /sys:/sys -v /sys/fs/cgroup:/sys/fs/cgroup:rw \
  -v /var/lib/docker:/var/lib/docker:rw \
  -v /var/lib/origin/openshift.local.volumes:/var/lib/origin/openshift.local.volumes:rslave \ 
  openshift/origin start



# Minishift
OpenShift en una VM
https://www.openshift.org/minishift/

Puede usar virtualbox para provisionar

Bajar la última release de https://github.com/minishift/minishift/releases
