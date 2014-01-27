En un dockerfile, cada paso se cachea (se crea una imagen nueva), por lo que al rehacer el build, se empieza desde la última instrucción modificada, o desde el último ADD

Los ADD no se cachean (issue abierta para intentar hashear lo que se añade: https://github.com/dotcloud/docker/issues/880)
