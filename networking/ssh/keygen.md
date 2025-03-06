<https://security.stackexchange.com/questions/143442/what-are-ssh-keygen-best-practices>

ssh-keygen -t ed25519 -a 100

ssh-keygen -t ed25519 -a 100 -f nombrefichero -C usuaro@host
-C es un comentario

Obtener firmas de una clave privada:

```bash
❯ ssh-keygen -E sha256 -lf *.pem
2048 SHA256:EgnQcbtwyGIqgqD9iSJu7HagtgnwdR+3UrHsqxA7E98  (RSA)

> ssh-keygen -E md5 -lf *.pem
2048 MD5:4f:3a:7d:7f:4a:8c:9b:9b:4e:5b:2a:2a:8b:9a:8c:8b  (RSA)
```
