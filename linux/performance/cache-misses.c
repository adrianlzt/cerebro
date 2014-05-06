#include <stdlib.h>
#include <stdio.h>
#include <time.h>

#define L1_CACHE_CAPACITY (32768 / sizeof(int))

int array[L1_CACHE_CAPACITY][L1_CACHE_CAPACITY];

struct timespec time_diff(struct timespec start, struct timespec end) {
struct timespec temp;

if (end.tv_nsec - start.tv_nsec < 0) {
temp.tv_sec = end.tv_sec - start.tv_sec - 1;
temp.tv_nsec = 1000000000 + end.tv_nsec - start.tv_nsec;
} else {
temp.tv_sec = end.tv_sec - start.tv_sec;
temp.tv_nsec = end.tv_nsec - start.tv_nsec;
}

return temp;
}

int main(void) {
struct timespec start, end;
int i, j;

clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &start);

for (i=0; i<L1_CACHE_CAPACITY; i++)
  for (j=0; j<L1_CACHE_CAPACITY; j++)
    array[j][i] = i*j; //malo
//    array[i][j] = i*j; //bueno

clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &end);


struct timespec delta = time_diff(start, end);
printf("Delta is %ld:%6ldn", delta.tv_sec, delta.tv_nsec);

return EXIT_SUCCESS;
} 
