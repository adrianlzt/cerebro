https://cloud.google.com/products/compute-engine/
IaaS
Correr máquinas virtuales.

Basado en KVM. Puedes arrancar maquinas con las configuraciones que quieras (num cpus, GBs ram).
Despliegue muy rápido (segundos)

Run large-scale workloads on virtual machines hosted on Google's infrastructure. Choose a VM that fits your needs and gain the performance of Google’s worldwide fiber network.

KVM ejecutado sobre el grid de máquinas de google.

Usando SDN, openflow.


# Google App engine
https://cloud.google.com/appengine

Correr aplicaciones python, Java, PHP o Go.

Permite tener tareas cron, almacenar datos, etc.
Te dan un dominio para tu app.

## Crear proyecto
https://console.developers.google.com/project
Crear un proyecto
Correr en local:
  dev_appserver.py .

Desplegar en google:
  appcfg.py -A nombreproyecto update app.yml

App desplegada en:
   https://project-id.appspot.com/

## SDK

### Arch
yaourt -S aur/google-appengine-python

### Pip
Instalar la lib de google.appengine
pip install --allow-unverified antlr-python-runtime --allow-external antlr-python-runtime google-appengine
pip install --upgrade google-api-python-client

## Gestor de proyectos gráfico
http://www.hutsby.net/2013/03/google-app-engine-launcher-on-ubuntu.html
