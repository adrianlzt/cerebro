// Arrays - zero indexed
// The array size must be decided upon declaration
// The format for declaring an array is follows:
// <datatype>[] <var name> = new <datatype>[<array size>];
int[] intArray = new int[10];

// Another way to declare & initialize an array
int[] y = { 9000, 1000, 1337 };

// Indexing an array - Accessing an element
Console.WriteLine("intArray @ 0: " + intArray[0]);
// Arrays are mutable.
intArray[1] = 1;


Array de objetos:
var newVertices = new [] {new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0)};



# Lists
// Lists are used more frequently than arrays as they are more flexible
// The format for declaring a list is follows:
// List<datatype> <var name> = new List<datatype>();
List<int> intList = new List<int>();
List<string> stringList = new List<string>();
List<int> z = new List<int> { 9000, 1000, 1337 }; // initialize
// The <> are for generics - Check out the cool stuff section

// Lists don't default to a value;
// A value must be added before accessing the index
intList.Add(1);
Console.WriteLine("intList @ 0: " + intList[0]);

// Numero de elemntos
intList.Count()



# List to Array
List<string> l = new List<string>();
l.Add("one");
string[] s = l.ToArray();
