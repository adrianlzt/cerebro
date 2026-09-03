https://github.com/zvec-ai/zvec-grep

Búsqueda por embedding y lexical (como rg).

# Indexar

```bash
npx @zvec/zvec-grep index --embedding local/potion-retrieval-32m
```

Genera un directorio `.zvec-grep`

# Buscar

```bash
npx @zvec/zvec-grep query --human "An unseen creature left a few marks. What did the detective infer?" --limit 3
```
