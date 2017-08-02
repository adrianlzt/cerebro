(int) sizeof(int)

In C89, sizeof operator only finds the size of a variable in bytes at compile time (in this case a void pointer of 8 bytes). It works the way you'd expect it to work on plain arrays, because their size is known at compile time.

En general, el tamaño del malloc debemos conocerlos nosotros y lo almacenaremos en una variable si lo necesitamos después.
