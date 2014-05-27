http://es.wikipedia.org/wiki/Variable_externa
http://crasseux.com/books/ctutorial/External-variables.html

//main.c
int main()
{
  extern int my_var;
                    
  my_var = 500;     
  print_value();   
  return 0;
}

//secondary.c
#include <stdio.h>
int my_var;

void print_value() {
  printf("my_var = %d\n", my_var);
}


gcc -o prog main.c secondary.c
