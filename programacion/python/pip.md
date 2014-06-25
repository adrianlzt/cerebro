Gestión de librerías para python.
Sería como un apt-get para python.
$ pip search <libreria>
$ pip install <libreria>
$ pip install MySQL_python==1.2.2
$ pip install --upgrade <paquete>
$ pip install -Iv http://sourceforge.net/projects/mysql-python/files/mysql-python/1.2.2/MySQL-python-1.2.2.tar.gz/download
  -I: ignore previous versions installed
  -v: verbose
$ pip show --files SomePackage
$ pip uninstall <libreria>
$ pip list


## Proxy ## es https_proxy, NO http_proxy
https_proxy=http://web-proxy.mydomain.com pip install paquete
pip install --proxy="user:password@server:port" yourpackage

