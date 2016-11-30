// Compare strings with current culture, ignoring case
string.Compare(fooString, "x", StringComparison.CurrentCultureIgnoreCase);

// Formatting, based on sprintf
string fooFs = string.Format("Check Check, {0} {1}, {0} {1:0.0}", 1, 2);



// You can split a string over two lines with the @ symbol. To escape " use ""
string bazString = @"Here's some stuff
on a new line! ""Wow!"", the masses cried";


Concatenar
string str = "Hello " + userName + ". Today is " + date + ".";
