http://git-scm.com/docs/git-format-patch

git format-patch master -o /path/to/your/patchfiles/
  Genera ficheros de parche por cada comit en el directorio /path/to/your/patchfiles/
  Generará los parches necesarios para que la rama master llegue al estado de la rama en la que estemos.

git format-patch --root -o donde_guardar_los_ficheros/
  genera parches desde el inicio del git


Movemos ese directorio al repo donde queramos aplicarlo.
Podemos ver que va a cambiar cada parche:
git apply --stat fichero.patch

Comprobar si se puede aplicar el parche:
git apply --check fichero.patch


Generar el parche del ultimo commit:
git format-patch -1

O de los dos ultimos:
git format-patch -2

Genera el parche del commit que pasamos y el anterior:
git format-patch -2 <sha1>

Genera un parche entre el commit aaaa (viejo) y el commit bbbb (nuevo):
git format-patch --stdout aaaa^..bbbb > fichero.patch
