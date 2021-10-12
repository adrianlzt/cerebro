Ejemplo de uso.
Si tengo esto:
data.docs

Me da un error porque data puede ser null, por lo que no podemos acceder a docs.

The property 'docs' can't be unconditionally accessed because the receiver can be 'null'.
Try making the access conditional (using '?.') or adding a null check to the target ('!')

Si usamos data!.docs estamos asegurando que data nunca va a ser null (tal vez lo tenemos comprobado en un if anterior)
