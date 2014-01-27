//Sacado de https://wiki.icinga.org/display/Dev/Submit+patches+using+git#Submitpatchesusinggit-2Doyourwork

Bajar el git:
git clone http://bablablabla

Definir mi usuario y password
git config --global user.name "pez"
git config --global user.email zt@gmail.com

Y mas cosas sobre el parche y enviar emails
[format]
    subjectprefix = PATCH
    suffix = .patch
    numbered = auto
 
[sendemail]
    smtpserver = your.smtp-server.tld
    smtpuser = your_username
        #smtppass = ******* # leave it blank and git will ask you


Crear una nueva rama donde haré mis cambios:
git branch my_patch master


Editar, testear, comprobar, trabajar...


Comitear cambios
git add <ficheros nuevos>
git commit
git cam (mi shortcout para commit -a -m)

Mejor no poner el -m, y definir el mensaje como sigue:
First line: Short intro
following lines: Explain what this commit stands for, 
what it solves. This helps others who are reading 
the log why this commit is so useful


Crear el patchfile
git format-patch master -o /path/to/your/patchfiles/


Enviar el parche:
$ git send-email /path/to/your/patchfiles/*.patch
(
   Answer the questions for git-send-email like:
   * From
   * To
   * Message ID (See the mail source on a mailinglist thread)
)





