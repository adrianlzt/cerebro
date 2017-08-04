// https://www.gnu.org/software/libc/manual/html_node/Date-and-Time.html

#include <time.h>

time_t rawtime;
time (&rawtime);
char fecha[100];
struct tm *timeinfo = localtime ( &rawtime );
strftime(fecha, 100, "%H:%M:%S", timeinfo);
printf("%s\n", fecha);


// Si queremos resolucion microsegundos
#include <time.h>
#include <sys/time.h>

struct timeval tp;
gettimeofday(&tp, NULL);
printf("unix timestamp: %ld, microsec: %ld\n", tp.tv_sec, tp.tv_usec);

struct tm *timeinfo = localtime(&tp.tv_sec);
char fecha[100];
strftime(fecha, 100, "%Y/%m/%d %H:%M:%S", timeinfo);
printf("%s.%ld\n", fecha, tp.tv_usec);




// Para resolución nanosegundo
#include <time.h>
#include <sys/time.h>

struct timespec ts;
clock_gettime(CLOCK_REALTIME, &ts);
printf("unix timestamp: %ld, nanosec: %ld\n", ts.tv_sec, ts.tv_nsec);

struct tm *timeinfo = localtime(&ts.tv_sec);
char fecha[100];
strftime(fecha, 100, "%Y/%m/%d %H:%M:%S", timeinfo);
printf("%s.%ld\n", fecha, ts.tv_nsec);

