Si estamos en la rama develop, ahora queremos generar una release, creamos una rama release.
En la rama release tendremos varios Release Candidate.
Durante esta generación de las RC podría producirse un cambio en la rama develop.

Para unir los cambios entre las RC y la develop se puede hacer un squash en la rama de release, para unir todos los commit en uno único (rebase -i ?)
Luego se haría un cherry-pick de este único commit de la rama release sobre la rama develop.
