http://www.tutorialspoint.com/cprogramming/c_strings.htm

char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char greeting[] = "Hello";

printf("Greeting message: %s\n", greeting );

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
