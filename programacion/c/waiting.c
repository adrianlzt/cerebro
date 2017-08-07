#define _GNU_SOURCE
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int main() {
  setbuf(stdout, NULL);
  struct timespec time = { 0, 200000000 };

  while (1) {
    printf("\rreading | ");
    nanosleep(&time, NULL);
    printf("\rreading / ");
    nanosleep(&time, NULL);
    printf("\rreading - ");
    nanosleep(&time, NULL);
    printf("\rreading \\ ");
    nanosleep(&time, NULL);
  }
}
