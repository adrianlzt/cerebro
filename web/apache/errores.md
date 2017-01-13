http://outofcontrol.ca/blog/comments/apache-no-space-left-on-device-cannot-create-sslmutex
http://stackoverflow.com/questions/13969272/apache-sslmutex-issue
No space left on device: Cannot create SSLMutex

Demasiados semaphores:
Borrarlos con:
ipcs -s | grep apache | awk ’ { print $2 } ’ | xargs -n 1 ipcrm -s

Revisar conf de apache
