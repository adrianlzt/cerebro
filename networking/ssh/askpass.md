https://mariomoura.com/post/ssh-ask-pass/

Para no tener las claves ssh sin cifrar, generar una password por cada clave ssh y almacenarla en gopass.
Luego usar:
```
SSH_ASKPASS=~/bin/askpass SSH_ASKPASS_REQUIRE=prefer 
```
para obtener la clave de gopass cuando ssh la necesite.
