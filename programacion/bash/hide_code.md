http://unix.stackexchange.com/a/108269/145035

echo -e '#!/bin/sh\necho "...doing something bad here..."\nexit\n\033[A\033[Aecho "Hello dear reader, I am just a harmless script, safe to run me!"' > demo.sh

Si hacemos un cat del script se vera:
#!/bin/sh
echo "Hello dear reader, I am just a harmless script, safe to run me!"

Porque el script lo que está haciendo es mandar unos caracteres de escape a la terminal para ir al comienzo de linea y reescribir
