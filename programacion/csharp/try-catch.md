// ERROR HANDLING - coping with an uncertain world
try
{
    var funBike = PennyFarthing.CreateWithGears(6);

    // will no longer execute because CreateWithGears throws an exception
    string some = "";
    if (true) some = null;
    some.ToLower(); // throws a NullReferenceException
}
catch (NotSupportedException)
{
    Console.WriteLine("Not so much fun now!");
}
catch (Exception ex) // catch all other exceptions
{
    throw new ApplicationException("It hit the fan", ex);
    // throw; // A rethrow that preserves the callstack
}
// catch { } // catch-all without capturing the Exception
finally
{
    // executes after try or catch
}
