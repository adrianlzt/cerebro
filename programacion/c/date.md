// https://www.gnu.org/software/libc/manual/html_node/Date-and-Time.html
// Codigo glibc: https://github.com/bminor/glibc/tree/master/time
// Codigo musl: https://git.musl-libc.org/cgit/musl/tree/src/time?h=v1.1.18

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



// Parsear fecha y imprimirla como unix epoch
#define _XOPEN_SOURCE
#include "stdio.h"
#include "stdlib.h"
#include "time.h"
#include "string.h"

int main(void) {
  printf("epoch time de 1970/1/1 00:00:00\n");

  struct tm tm;
  memset(&tm, 0, sizeof(struct tm));
  strptime("1/1/1970 00:00:00", "%d/%m/%Y %H:%M:%S", &tm);

  char fechastr[100];
  strftime(fechastr, 100, "%s", &tm);
  printf("%s\n", fechastr);

  return 0;
}
