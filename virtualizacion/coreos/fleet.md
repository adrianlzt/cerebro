https://coreos.com/using-coreos/systemd/

fleet is a layer on top of systemd, the well-known init system. Fleet basically lets you manage your services on any server in your cluster transparently, and gives you some convenient tools to inspect the state of your services.


La idea es arrancar un proceso, y en el ExecStartPost avisar a etcd de que hemos arrancado esa máquina.
ExecStart=/bin/bash -c '/usr/bin/docker start -a apache || /usr/bin/docker run --name apache -p 80:80 coreos/apache /usr/sbin/apache2ctl -D FOREGROUND'
ExecStartPost=/usr/bin/etcdctl set /domains/example.com/10.10.10.123:8081 running
