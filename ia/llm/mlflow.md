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

No entiendo muy bien como funciona el tema de almacenamiento de artefactos.
No consigo que los almacene mlflow localmente, parece que necesita un object storage.
Por defecto el mlflow server hará de proxy para este object storage.

Usando azure como blob storage me ha funcionado con:

```bash
AZURE_STORAGE_CONNECTION_STRING="BlobEndpoint=https://mlflow.blob.core.windows.net;SharedAccessSignature=sp=racwdl&st=2025-06-13T07:44:31Z&se=2035-06-13T15:44:31Z&spr=https&sv=2024-11-04&sr=c&sig=REDACTED" mlflow server --host 0.0.0.0 --port 5000 --backend-store-uri sqlite:////mlflow_data/mlruns.db --artifacts-destination wasbs://mlflow-artifacts@mlflow.blob.core.windows.net/ --serve-artifacts
```

# Usar un servidor remoto

```python
mlflow_tracking_uri = "http://mlflow-server.com"
mlflow.set_tracking_uri(mlflow_tracking_uri)
```

## Azure ML como servidor de MLFlow

<https://learn.microsoft.com/en-us/azure/machine-learning/how-to-use-mlflow-configure-tracking?view=azureml-api-2&tabs=cli%2Cmlflow>

Podemos usar un workspace de Azure ML como servidor de MLFlow.

**NOTA**: junio 2025, no soporta tracing, por lo que no podremos ver las llamadas al LLM.

Tendemos que tener instalados los paquetes: mlflow-skinny y azureml-mlflow.
El skinny es mlflow sin la UI ni otras cosas, que hacen que sea más ligero.

Luego tenemos que configurar mlflow.set_tracking_uri para que apunte al workspace de Azure ML.

Se puede obtener de varias maneras, por ejemplo con `az`:

```bash
az ml workspace show -g RESOURCEGROUP -n NOMBRE --query mlflow_tracking_uri
```

También podemos usar el SDK de Azure ML para obtenerlo junto con un fichero `config.json` que baremos del workspace:
Ejemplo completo en <https://gist.github.com/adrianlzt/435c4a95e105abd105931a0a15347b1c>

Cuando ejecutemos un experimento, para los resultados, iremos a Machine Learning Studio - Assets - Experiments.

# Artefacts

Cuando queremos almacenar un artefact, hay que pasar un directorio.
