.git/config:

```
[remote "origin"]
        url = git@bitbucket.org:adria/aian.git
        url = ssh://xxxoer@sun/home/repositorios/

[branch "master"]
        remote = origin
        merge = refs/heads/master
```

También se pueden poner múltiples push url al mismo remote:

<https://stackoverflow.com/a/66353870/1407722>

```bash
git remote set-url --add --push all git@github.com:namespace/repo-name.git
git remote set-url --add --push all git@gitlab.com:namespace/repo-name.git
```

En la config queda tipo:

```
[remote "origin"]
        url = https://github.com/foobar/cerebro.git
        fetch = +refs/heads/*:refs/remotes/origin/*
        pushurl = git@gitlab.com:foobar/cerebro.git
        pushurl = https://github.com/foobar/cerebro.git
```
