public // Visibility
static // Allows for direct call on class without object
int // Return Type,
MethodSignatures(
    int maxCount, // First variable, expects an int
    int count = 0, // will default the value to 0 if not passed in
    int another = 3,
    params string[] otherParams // captures all other parameters passed to method
)
{
    return -1;
}

MethodSignatures(11, count: 3, another: 9)



// Methods can have the same name, as long as the signature is unique
// A method that differs only in return type is not unique
public static void MethodSignatures(
    ref int maxCount, // Pass by reference
    out int count)
{
    //the argument passed in as 'count' will hold the value of 15 outside of this function
    count = 15; // out param must be assigned before control leaves the method
}


Para llamar a la función pasando la referencia:
MethodSignatures(ref mivar, ...)
