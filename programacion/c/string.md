http://www.tutorialspoint.com/cprogramming/c_strings.htm

char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char greeting[] = "Hello";
char * greeting = "Hello"; // no funcionará el sizeof(greeting) (mirar arrays.md)

sizeof(greeting); //cuando es un array, será la longitud del array más 1 (el caracter 0 al final)

printf("Greeting message: %s\n", greeting );

Iterando una string:
while (*string++) {
  // algo
}

strcpy(s1, s2);
Copies string s2 into string s1.

strcat(s1, s2);
Concatenates string s2 onto the end of string s1.

strlen(s1);
Returns the length of string s1.

strcmp(s1, s2);
Returns 0 if s1 and s2 are the same; less than 0 if s1<s2; greater than 0 if s1>s2.

strchr(s1, ch);
Returns a pointer to the first occurrence of character ch in string s1.

strstr(s1, s2);
Returns a pointer to the first occurrence of string s2 in string s1.


# strtok
http://www.tutorialspoint.com/c_standard_library/c_function_strtok.htm

Trocea una string en chunks delimitados por el caracter que le digamos.
