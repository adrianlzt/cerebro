Es una db LevelDB.

Para consultarla podemos usar:
https://github.com/cions/leveldb-cli

```bash
leveldb g "mapwindows.net" | tr -d '\0' | jq
```
