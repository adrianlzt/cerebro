http://codebucket.co.in/apache-prefork-or-worker/

Dos opciones:
Prefork MPM uses multiple child processes with one thread each and each process handles one connection at a time.
Worker MPM uses multiple child processes with many threads each. Each thread handles one connection at a time.

Chequear cual tenemos:
/usr/sbin/apache2 -V | grep MPM
  debian
httpd -V | grep MPM
  centos




Which one to use?

On high traffic websites worker is preferable because of low memory usage as comparison to prefork MPM but prefork is more safe if you are using libraries which are not thread safe.

For example you cannot use mod_php(not thread safe) with worker MPM but can use with prefork.

So if you are using all thread safe libraries then go with worker and if you are not sure then use default prefork MPM, you may have to increase your RAM in case of high traffic.
