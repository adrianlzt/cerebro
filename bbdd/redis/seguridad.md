<https://redis.io/topics/acl>
<https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/>
Para redis 6

# Auth

Si la password se ha definido como "#..." en el fichero de ACLs, es un hash de sha256.
<https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/#:~:text=Configure%20valid%20passwords%20for%20the%20user%3A>

Redis >= 6:

```
AUTH <username> <password>
```

Redis < 6 (para versiones superiores, esto hace que el user sea "default"):

```
AUTH <password>
```

# Trucos mientras llega ACL

<http://antirez.com/news/126>
mirar sección ACL

Renombrar los comandos
