<https://dvc.org/>

El "git" de los datos

Install:

```bash
uv tool install -U --with dvc-s3 dvc
```

Usar sin instalar:

```bash
uvx dvc
```

# Iniciar

```bash
dvc init
git commit -m "chore: initialize DVC"
```

Enable auto staging para meter los ficheros al stage según hacemos dvc add:

```bash
dvc config core.autostage true
```

# Añadir ficheros

```bash
dvc add data/data.csv
git commit -m "feat: add data"
```

Por cada fichero añadido a dvc genera otro fichero con extensión .dvc que contiene la información del fichero original y su hash. Este fichero es el que se añade al git y no el original. Mete automáticamente el fichero original al .gitignore para que no se añada al git.

## Remote

<https://dvc.org/doc/user-guide/data-management/remote-storage>

Almacenar los ficheros en servicios remotos.

```bash
dvc remote add myremote /tmp/dvcstore
dvc push
```

Para Azure Blob Storage:

```bash
dvc remote add -d myremote azure://foobar/
dvc remote modify --local azure connection_string 'BlobEndpoint=https://ACCOUTN.blob.core.windows.net;SharedAccessSignature=sp=racwdl&st=2025-06-05T14:59:36Z&se=2029-06-05T22:59:36Z&spr=https&sv=2024-11-04&sr=c&sig=SECRETODiEHXPE%3D
```

El `--local` hace que se guarde la info en `.dvc/config.local` y no en `.dvc/config`, de forma que no se suba al git.

## dvc commit

<https://dvc.org/doc/command-reference/commit>

Stores the current contents of files and directories tracked by DVC in the cache, and updates dvc.lock or .dvc files if/as needed. This forces DVC to accept any changed contents of tracked data currently in the workspace.

Útil si tenemos un fichero en local y queremos que actualize el dvc.lock con esos valores locales.

# Experiments

<https://dvc.org/doc/command-reference/exp/run#options>

Es una especie de _Makefile_ para almacenar como ejecutar experimentos.
Definimos que inputs tenemos (para poder saber si hace falta volver a ejecutarlo ante cambios en los inputs), que parámetros, que outputs y que comandos.
También podemos definir dependencias entre experimentos, para ejecutar unos antes de otros (DAG, directed acyclic graph).

Como dependencias se debe meter el código involucrado (por ejemplo, ficheros .py) y los datos de entrada (ficheros .csv, .json, etc).

Ejemplo:

```bash
dvc stage add --name data_split \
  --params base,data_split \
  --deps data/pool_data --deps src/data_split.py \
  --outs data/train_data --outs data/test_data \
  python src/data_split.py
```

Esto genera una configuración en el fichero `dvc.yaml`.

En el fichero `params.yaml` podemos definir parámetros (deberemos parsearlo en nuestro código python y usarlo).
Podemos modificar los parámetros modifcando ese fichero o usando `--set-param foo=bar`.
Este --set-param / -S lo que hace es modificar el fichero `params.yaml` y luego ejecutar.

Ejecutar los experimentos:

```bash
dvc exp run
```

Cuando se ejecuta un experimento, dvc fija el commit (hace un detach, supongo que para asegurarse que no hay cambios mientras se ejecuta).

Ejecutar una única stage (preguntando antes de empezar y forzando a que se ejecute):

```bash
dvc exp run -fis stage_foo
```

Tras ejecutar los experimentos se genera un fichero `dvc.lock`, donde se guarda que inputs, params y outputs se generaron.
Si volvemos a ejecutar los exprimentos, pero no hay cambios en los inputs, nos dirá que ya está ejecutado y no hace falta.

Podemos especificar un único experimento con `dvc exp run -n <nombre>`.

Si clonamos un repo y queremos ejecutar los experimentos (suponiendo que se ha usado un remote donde acceder a los ficheros):

```bash
dvc exp run --pull
```

Listar experimentos:

```bash
dvc exp show --all-commits
```

# Remotes

<https://dvc.org/doc/user-guide/data-management/remote-storage>

Añadir remoto:

```bash
dvc remote add -d myremote /tmp/dvcstore
```
