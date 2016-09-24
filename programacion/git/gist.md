https://gist.github.com/
http://manpages.ubuntu.com/manpages/trusty/man1/gist-paste.1.html
https://gist.github.com/caspyin/2288960
  api con curl

# Post anonimo
curl  -X POST --data '{"description":"Created via API","public":"true","files":{"file1.txt":{"content":"Demo"}}' https://api.github.com/gists
En la respuesta el link está en: "html_url"

Si queremos buscar un gist anonimo tendremos que poner
cadena anon:true

Ej.: https://gist.github.com/search?utf8=%E2%9C%93&q=cadena+anon%3Atrue&ref=searchresults

# Post de un fichero
http://stackoverflow.com/questions/26484337/upload-a-file-to-a-gist-with-bash

FNAME="pepito.yml"
CONTENT=$(sed -e 's/\r//' -e's/\t/\\t/g' -e 's/"/\\"/g' "${FNAME}" | awk '{ printf($0 "\\n") }')
curl  -X POST --data '{"description":"Created via API","public":"true","files":{"'"$FNAME"'":{"content":"'"$CONTENT"'"}}}' https://api.github.com/gists


# Para arch
https://github.com/defunkt/gist
packer -S gist-git
gist --login

wget https://gist.githubusercontent.com/adrianlzt/1a5815d125c9a5fbce6b/raw/c44e43d610be25c3b6970744769aa4c4443e0081/gist
chmod a+x gist
./gist fichero.para.subir


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
