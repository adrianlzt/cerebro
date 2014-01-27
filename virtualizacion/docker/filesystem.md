http://blog.docker.io/2013/11/docker-0-7-docker-now-runs-on-any-linux-distribution/

Docker puede usar tres drivers para los sistemas de ficheros: AUFS, VFS y DeviceMapper.

En ubuntu usa AUFS (en otras distros puede que aufs no esté disponible y usará DeviceMapper).
Mirar linux/filesystems/aufs.md

Si usa AUFS, en /var/lib/docker/aufs/mnt tendremos todos las layers.
