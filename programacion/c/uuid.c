// gcc -luuid -o test test.c

#include<stdio.h>
#include <uuid/uuid.h>

int main(int arg_count,char ** arg_values)
{
 uuid_t uuid;
 char uuid_string[37];
 uuid_generate(uuid);
 uuid_unparse(uuid, uuid_string);

 printf("Hello World: %s\n", uuid_string);
 return 0;
}

