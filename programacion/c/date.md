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

