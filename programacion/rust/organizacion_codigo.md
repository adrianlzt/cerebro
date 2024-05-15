Split your program into a main.rs and a lib.rs and move your program’s logic to lib.rs.
As long as your command line parsing logic is small, it can remain in main.rs.
When the command line parsing logic starts getting complicated, extract it from main.rs and move it to lib.rs.

El código en main.rs no se puede testear.
Deberá ser lo suficientemente sencillo para que una revisión visual sea ssuficiente.

Normalmente main.rs solo realizará estas tareas:
 - Calling the command line parsing logic with the argument values
 - Setting up any other configuration
 - Calling a run function in lib.rs
 - Handling the error if run returns an error
