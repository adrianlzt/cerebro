http://man7.org/linux/man-pages/man7/fanotify.7.html

fanotify - monitoring filesystem events


fanotify syscall has originally been implemented as “decent” mechanism for anti-virus vendors to intercept file access events, potentially on a whole mountpoint at once

While it may be used to deny file accesses, it may also just report file access events in a non-blocking fashion, potentially dropping2 events if the kernel queue overflows.


Ejemplo:
https://blog.jtlebi.fr/2015/04/25/how-i-shrunk-a-docker-image-by-98-8-featuring-fanotify/?utm_content=buffer3f3a8&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
