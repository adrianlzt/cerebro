Obtener el fingerprint del server
ssh-keygen -lf id_rsa.pub

Si queremos formato tipo "92:4a:c6:21:7c:d5:11:4a:71:60:c2:20:1e:f4:ee:0c"
ssh-keygen -lE md5 -f fichero_pub_or_key

Equivalente para las que estén en el agent:
ssh-add -l
