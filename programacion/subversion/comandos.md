Crear repo                svnadmin create .
Bajar repo                svn co URL (nos crea un dir .svn)
Información repo          svn info
Estado repo               svn st
Borrar ficheros           svn del
Actualiar repo            svn up
Historial                 svn up; svn log
Commit                    svn commit -m "mensaje"
Diff                      svn diff -r 90:91


# Bajar partes de un repo
Primero chequear lo que queremos:
svn ls https://web.com/repo/trunk/src/templates/project.template

Luego bajar
svn export https://web.com/TDAF/repo/trunk/src/templates/project.template

