// Converting data

// Convert String To Integer
// this will throw a FormatException on failure
int.Parse("123");//returns an integer version of "123"

// try parse will default to type default on failure
// in this case: 0
int tryInt;
if (int.TryParse("123", out tryInt)) // Function is boolean
    Console.WriteLine(tryInt);       // 123

// Convert Integer To String
// Convert class has a number of methods to facilitate conversions
Convert.ToString(123);
// or
tryInt.ToString();

// Casting
// Cast decimal 15 to a int
// and then implicitly cast to long
long x = (int) 15M;
