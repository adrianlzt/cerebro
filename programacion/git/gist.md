https://gist.github.com/
http://manpages.ubuntu.com/manpages/trusty/man1/gist-paste.1.html

# Para arch
https://github.com/defunkt/gist
packer -S gist-git
gist --login


# Ubuntu
Compartir ficheros / configuraciones / texto mediante GitHub.
Se puede hacer entrando en la web o desde la consola.

apt-get install gist

$ gist-paste
escribir algo
Control+d
https://gist.github.com/d795e1c4a4ff80e0de57

$ gist-paste file1 file2.rb *.py

Clipboard:
gist-paste -P

Actualizar un gist (tiene revisiones)
gist-update fichero -u 232436432 

Copiar url resultante al clipboard
gist-update -c ...


Para logearnos con nuestra cuenta de github:
gist-paste --login

Una vez logueada nuestra cuenta para crear gists anonimos
gist -a ...
