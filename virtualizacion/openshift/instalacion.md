# Container
Montar Origin sobre un container privileged
https://docs.openshift.org/latest/getting_started/administrators.html#running-in-a-docker-container

docker run -d --name "origin" 
  --privileged --pid=host --net=host \
  -v /:/rootfs:ro -v /var/run:/var/run:rw -v /sys:/sys -v /sys/fs/cgroup:/sys/fs/cgroup:rw \
  -v /var/lib/docker:/var/lib/docker:rw \
  -v /var/lib/origin/openshift.local.volumes:/var/lib/origin/openshift.local.volumes:rslave \ 
  openshift/origin start
