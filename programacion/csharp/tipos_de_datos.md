///////////////////////////////////////////////////
// Types & Variables
//
// Declare a variable using <type> <name>
///////////////////////////////////////////////////

// Sbyte - Signed 8-bit integer
// (-128 <= sbyte <= 127)
sbyte fooSbyte = 100;

// Byte - Unsigned 8-bit integer
// (0 <= byte <= 255)
byte fooByte = 100;

// Short - 16-bit integer
// Signed - (-32,768 <= short <= 32,767)
// Unsigned - (0 <= ushort <= 65,535)
short fooShort = 10000;
ushort fooUshort = 10000;

// Integer - 32-bit integer
int fooInt = 1; // (-2,147,483,648 <= int <= 2,147,483,647)
uint fooUint = 1; // (0 <= uint <= 4,294,967,295)

// Long - 64-bit integer
long fooLong = 100000L; // (-9,223,372,036,854,775,808 <= long <= 9,223,372,036,854,775,807)
ulong fooUlong = 100000L; // (0 <= ulong <= 18,446,744,073,709,551,615)
// Numbers default to being int or uint depending on size.
// L is used to denote that this variable value is of type long or ulong

// Double - Double-precision 64-bit IEEE 754 Floating Point
double fooDouble = 123.4; // Precision: 15-16 digits

// Float - Single-precision 32-bit IEEE 754 Floating Point
float fooFloat = 234.5f; // Precision: 7 digits
// f is used to denote that this variable value is of type float

// Decimal - a 128-bits data type, with more precision than other floating-point types,
// suited for financial and monetary calculations
decimal fooDecimal = 150.3m;

// Boolean - true & false
bool fooBoolean = true; // or false

// Char - A single 16-bit Unicode character
char fooChar = 'A';

// Strings -- unlike the previous base types which are all value types,
// a string is a reference type. That is, you can set it to null
string fooString = "\"escape\" quotes and add \n (new lines) and \t (tabs)";
Console.WriteLine(fooString);

// You can access each character of the string with an indexer:
char charFromString = fooString[1]; // => 'e'



// Use const or read-only to make a variable immutable
// const values are calculated at compile time
const int HoursWorkPerWeek = 9001;
