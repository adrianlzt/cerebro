///////////////////////////////////////
// CLASSES - see definitions at end of file
///////////////////////////////////////
public static void Classes()
{
    // See Declaration of objects at end of file

    // Use new to instantiate a class
    Bicycle trek = new Bicycle();

    // Call object methods
    trek.SpeedUp(3); // You should always use setter and getter methods
    trek.Cadence = 100;

    // ToString is a convention to display the value of this Object.
    Console.WriteLine("trek info: " + trek.Info());

    // Instantiate a new Penny Farthing
    PennyFarthing funbike = new PennyFarthing(1, 10);
    Console.WriteLine("funbike info: " + funbike.Info());

    Console.Read();
} // End main method
