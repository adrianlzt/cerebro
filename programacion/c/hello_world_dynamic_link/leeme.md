http://www.software-architect.net/blog/article/date/2015/05/05/tracing-shared-library-calls-with-ltrace-and-latrace.html

We create a shared library from hello.c:
$ gcc -fPIC --shared -o libhello.so hello.c

And we create the executable from helloMain.c which links against the library created before:
$ gcc -o hello helloMain.c -lhello -L.

LD_LIBRARY_PATH=. ./hello

