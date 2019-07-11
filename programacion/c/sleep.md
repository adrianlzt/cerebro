https://www.gnu.org/software/libc/manual/html_node/Sleeping.html#Sleeping
http://pubs.opengroup.org/onlinepubs/009695399/functions/sleep.html

#include <unistd.h>

unsigned sleep(unsigned seconds);



Otra forma, para tener más resolución:

#include <time.h>
struct timespec time = { 1, 500000000 }; // 1s + 500.000.000ns, 1.5"
if (nanosleep(&time, NULL) < 0) {
  printf("error nanosleep: %s\n", strerror(errno));
}

