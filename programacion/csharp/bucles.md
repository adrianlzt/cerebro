// While loop
int fooWhile = 0;
while (fooWhile < 100)
{
    //Iterated 100 times, fooWhile 0->99
    fooWhile++;
}

// Do While Loop
int fooDoWhile = 0;
do
{
    // Start iteration 100 times, fooDoWhile 0->99
    if (false)
        continue; // skip the current iteration

    fooDoWhile++;

    if (fooDoWhile == 50)
        break; // breaks from the loop completely

} while (fooDoWhile < 100);

//for loop structure => for(<start_statement>; <conditional>; <step>)
for (int fooFor = 0; fooFor < 10; fooFor++)
{
    //Iterated 10 times, fooFor 0->9
}

// For Each Loop
// foreach loop structure => foreach(<iteratorType> <iteratorName> in <enumerable>)
// The foreach loop loops over any object implementing IEnumerable or IEnumerable<T>
// All the collection types (Array, List, Dictionary...) in the .Net framework
// implement one or both of these interfaces.
// (The ToCharArray() could be removed, because a string also implements IEnumerable)
foreach (char character in "Hello World".ToCharArray())
{
    //Iterated over all the characters in the string
}
