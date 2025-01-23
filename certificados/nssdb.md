NSSDB (Network Security Services Database)

Usado por los navegadores & co para almacenar certificados.

Suele estar en ~/.pki/nssdb

Parece que son dos ficheros sqlite3, key4.db y cert9.db.
Dentro el contenido puede estar cifrado.

Para consultar esa db podemos usar la herramienta certutil que viene con nss-tools.

Listar claves privadas:

```bash
certutil -K -d ~/.pki/nssdb
```

```

```
