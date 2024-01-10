https://azure.microsoft.com/es-es/pricing/details/app-service/linux/
Mirar functions.md

Coste por reserva de recursos.
Escalado vertical u horizontal.
Típico uso, web apps, backends, etc.
Es más parecido a levantar una máquina y correr una aplicación.
Nos da un endpoint desde donde podemos ver el estado, hacer ssh, etc.
https://github.com/projectkudu/kudu/wiki

Podemos desplegar código en distintos lenguajes o un contenedor.
https://learn.microsoft.com/en-us/azure/app-service/quickstart-custom-container?tabs=dotnet&pivots=container-linux-vscode

Como el app engine de Google cloud.

# Pricing
https://azure.microsoft.com/es-es/pricing/details/app-service/linux/

Lo más barato
B1: 1vCPU / 1.75GiB / 10GiB - €11,833/mes

# Ejemplo python
https://learn.microsoft.com/en-us/azure/app-service/quickstart-python?tabs=flask%2Cwindows%2Cazure-cli%2Cazure-cli-deploy%2Cdeploy-instructions-azportal%2Cterminal-bash%2Cdeploy-instructions-zip-azcli

git clone https://github.com/Azure-Samples/msdocs-python-flask-webapp-quickstart
cd msdocs-python-flask-webapp-quickstart
az webapp up --runtime PYTHON:3.9 --sku B1 --logs

Creará un resource group tipo nombre.usuario_rg_1234

La aplicación se desplegará en un dominio tipo:
https://ashy-island-464e1b62755447148a9e054a916d139b.azurewebsites.net/
Se pueden luego añadir dominios custom.

Si queremos acceder al kudu, poner, tras el id de la app, scm:
https://ashy-island-464e1b62755447148a9e054a916d139b.scm.azurewebsites.net/

# Contenedores / docker
También podemos desplegar contenedores.

Parece que espera que sea una app web y que tengamos definido en la variable de entorno "PORT" donde expone el server http.

Si queremos ver los logs del contenedor iremos a "Deployment Center / Logs".
