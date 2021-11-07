https://www.arduino.cc/reference/en/language/variables/data-types/stringobject/

Concatenar
String(stringTwo + " with more")


Convertir a integer:
inString.toInt()

Double a str:
char * dtostrf(double number, signed char width, unsigned char prec, char *s)

Int a *char[]
int num = 1234;
char cstr[16];
itoa(num, cstr, 10);


std::string
Algunas libs también usan esta string, que es la de c++ (por debajo creo que es esta de basic_string)
https://en.cppreference.com/w/cpp/string/basic_string
