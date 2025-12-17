Podemos configurar "credential" helpers en `.gitconfig` para usar programas externos que proveeran la auth a git para repos.

Entiendo que típicamente se usa para remotes https.

Config para github y gitlab:

```
[credential "https://github.com"]
 helper =
 helper = !/usr/bin/gh auth git-credential
[credential "https://gist.github.com"]
 helper =
 helper = !/usr/bin/gh auth git-credential
[credential "https://gitlab.com"]
  helper =
  helper = !/usr/bin/glab auth git-credential
```
