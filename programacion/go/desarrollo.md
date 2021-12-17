https://github.com/unknwon/bra

Detecta cambios en el código y reinicia la app

go get github.com/unknwon/bra

bra init
  genera el fichero de conf (.bra.toml)
bra run

Generalmente el de por defecto es lo que necesitamos.

Ejemplo de config:
.bra.toml:

[run]
init_cmds = [
  ["go", "build","-race","-o", "./bin/agent", "./pkg/"],
  ["./bin/agent"]
]
watch_all = true
watch_dirs = [
  "$WORKDIR/pkg",
]
watch_exts = [".go", ".toml"]
build_delay = 1500
cmds = [
  ["go", "build","-race", "-o", "./bin/agent", "./pkg/"],
  ["./bin/agent"]
]



Ejemplo ejecutando tests para python
[run]
watch_all = true
watch_dirs = [ "$WORKDIR/", ]
watch_exts = [".py"]
build_delay = 1500
cmds = [["pytest", "--cov-report", "html", "--cov"]]
