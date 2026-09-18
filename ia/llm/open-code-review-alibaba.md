https://open-codereview.ai/

Se puede instalar con AUR en arch linux.

# Config

```bash
ocr config provider
```

Almacena en ~/.opencodereview

# Review

Ver que vamos a revisar:
```bash
ocr review --preview [OTROS PARAMS]

```

Los cambios actuales (Review staged + unstaged + untracked changes in current workspace):
```bash
ocr review
```

Cambios entre ramas (por ejemplo si tenemos una MR):
```bash
ocr review --from main --to fix/foobar

Un commit específico:
```bash
ocr review --commit abc123
```
