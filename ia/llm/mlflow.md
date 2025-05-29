<https://mlflow.org/>
<https://github.com/mlflow/mlflow>

MLflow is an open-source platform, purpose-built to assist machine learning practitioners and teams in handling the complexities of the machine learning process. MLflow focuses on the full lifecycle for machine learning projects, ensuring that each phase is manageable, traceable, and reproducible

Trackear experimentos de ML.

UI en <http://localhost:5000/>

Lo usamos con la librería de python.

Por defecto almacena en ficheros locales (`mlruns/ mlartifacts/`).
Para ver la ui:

```bash
mlflow ui
```

# Remote server

Tambíen podemos arrancar un server y enviar las trazas via http:

Arrancar el server:

```bash
mlflow server --backend-store-uri sqlite:///mydb.sqlite
```

Esto también levantará la UI.
