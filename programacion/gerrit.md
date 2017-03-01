https://upspin-review.googlesource.com

Se usa siempre con codereview?
Bajar git-codereview
go get -u golang.org/x/review/git-codereview


git co master
git sync
Hacer cambios
git add ficheros
git change nombre_rama
  Esto nos abre la ventana de commit. La primera linea debe ser
  pkg afectado: que sucede (aqui debe ir lo que siguiria a "Este cambio modifica upspin para....")
  subject debe ser <= que 64 chars
  las lineas <= 70 chars
Si queremos, podemos meter mas ficheros en el git y volver a hacer el git change.

Cuando querramos enviar:
git mail


Si necesitamos hacer un cambio de algo ya enviado:
git change rama
vi fichero
git add fichero
git commit --amend
