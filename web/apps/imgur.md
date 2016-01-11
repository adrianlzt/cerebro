Tiene api para poder enviar imagenes
https://api.imgur.com/


curl -F "image=@IMAGEN.JPG" -sS -F key=b3625162d3418ac51a9ee805b1840452 -H 'Expect: ' http://imgur.com/api/upload.json


yaourt -S imgur

Tambien un bash script aqui, en imgur.sh
