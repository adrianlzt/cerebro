<https://dvc.org/>

El "git" de los datos

Install:

```bash
uvx tool install dvc
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
dvc remote add -d myremote /tmp/dvcstore
dvc push
```

# Experiments

<https://dvc.org/doc/command-reference/exp/run#options>

Es una especie de _Makefile_ para almacenar como ejecutar experimentos.
Definimos que inputs tenemos (para poder saber si hace falta volver a ejecutarlo ante cambios en los inputs), que parámetros, que outputs y que comandos.
También podemos definir dependencias entre experimentos, para ejecutar unos antes de otros (DAG, directed acyclic graph).

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

Ejecutar los experimentos:

```bash
dvc exp run
```

Tras ejecutar los experimentos se genera un fichero `dvc.lock`, donde se guarda que inputs, params y outputs se generaron.
Si volvemos a ejecutar los exprimentos, pero no hay cambios en los inputs, nos dirá que ya está ejecutado y no hace falta.

Podemos especificar un único experimento con `dvc exp run -n <nombre>`.
