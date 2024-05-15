Smart pointers are data structures that act like a pointer but also have additional metadata and capabilities.

Se implementan con `struct` que implementarán los traits Deref y Drop.

Deref define que pasará cuando usemos el operador "*" (no confundir con la multiplicación). Es el operador de "dame a donde apunta este puntero".

Los tipos más comunes de smart pointers:
- Box<T> para valores en el heap.
- Rc<T> para valores con múltiples propietarios.
- Ref<T> y RefMut<T> para valores con un único propietario y acceso compartido.


# Deref coercion
Deref coercion es una característica de Rust que convierte automáticamente un tipo en otro cuando es necesario.

Lo hace en estos tres casos:
From &T to &U when T: Deref<Target=U> 
From &mut T to &mut U when T: DerefMut<Target=U> 
From &mut T to &U when T: Deref<Target=U>


# Drop trait
Customize what happens when a value is about to go out of scope. You can provide an implementation for the Drop trait on any type, and that code can be used to release resources like files or network connections

No se puede llamar a "Drop" directamente.
Si necesitamos hacerlo lo haremos mediante std::mem::drop.



# Rc / Reference counting
This pointer enables you to allow data to have multiple owners by keeping track of the number of owners and, when no owners remain, cleaning up the data.
