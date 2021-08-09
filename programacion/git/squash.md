Si estamos en la rama develop, ahora queremos generar una release, creamos una rama release.
En la rama release tendremos varios Release Candidate.
Durante esta generación de las RC podría producirse un cambio en la rama develop.

Para unir los cambios entre las RC y la develop se puede hacer un squash en la rama de release, para unir todos los commit en uno único (rebase -i ?)
Luego se haría un cherry-pick de este único commit de la rama release sobre la rama develop.

https://ariejan.net/2011/07/05/git-squash-your-latests-commits-into-one/
git rebase -i HEAD~3

Nos abrirá el editor con los commits que vamos a mergear
Los commits que queramos "squashear" cambiamos "pick" por squash

Muchas veces queremos juntar todos los commits seleccionados.
En ese caso pondremos squash en todos menos en el de la primera linea.

Al terminar no generará un mensaje de commit con todo lo que estamos mergeando, que podremos modificar.
