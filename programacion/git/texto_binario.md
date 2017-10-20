Diff branches                                       git diff <branch1> <branch2>
                                                    git diff <branch1>..<branch2>
Diff branches rama contra el ancestro común         git diff <branch1>...<branch2>
Mirar cambios                                       git diff
Cambios respecto al dir local (sin commit)          git diff --staged
Cambios entre HEAD y dos commits antes              git diff HEAD~1..HEAD


# Diff con un programa determinado
https://git.wiki.kernel.org/index.php/GitTips#How_to_use_git_to_track_OpenDocument_.28OpenOffice.2C_Koffice.29_files.3F
http://git-scm.com/book/ch7-2.html

Si queremos usar git con formatos de texto binario (como por ejemplo .odt o .docx) deberemos hacer:

Definir un conversor del formato binario a texto plano:
~/.gitconfig:
[diff "odf"]
      textconv=odt2txt

Otra forma es definir esa opción solo para el proyecto en el que estemos con:
git config diff.odf.textconv odt2txt


En nuestro proyecto git definir que extensiones pertenecen a ese formato:
.gitattributes:
*.ods diff=odf
*.odt diff=odf
*.odp diff=odf



También podemos hacer diff entre imágenes a partir de la metadata.


# Ficheros modificados entre dos commits
git diff --name-only $GIT_PREVIOUS_SUCCESSFUL_COMMIT $GIT_COMMIT
