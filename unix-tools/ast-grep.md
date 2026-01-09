<https://ast-grep.github.io/>

ast-grep(sg) is a fast and polyglot tool for code structural search, lint, rewriting at large scale.

# Search and rewite

```bash
ast-grep -p '$A && $A()' -r '$A?.()'
```

Busca ese patrón y lo reemplaza.

## YAML

Buscar una key en yaml y obtener lo que está debajo (para este caso tal vez mejor `yq`):

```bash
ast-grep --lang yaml --pattern 'community.docker.docker_container: $$$'
```

# Linting

Podemos definir [reglas](https://ast-grep.github.io/guide/rule-config.html) y verificarlas con el escaner.

```bash
ast-grep scan
```
