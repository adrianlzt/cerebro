# Modificar le mensaje de un commit en el history
https://linuxize.com/post/change-git-commit-message/

git rebase -i HEAD~5
cambiar el commit que queremos de "pick" a "reword"
Guardar
Se abrirá el mensaje del commit.
Cambiar


# Modificar contenido
Cambiar "pick" por "edit".

Tras modificar lo que queremos:
git commit --amend -a

Y para terminar:
git rebase --continue



Mirar también:
remove-sensitive-data.md
