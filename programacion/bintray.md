https://bintray.com/

Bintray is a social service for developers to publish, download, store, promote, and share open source software packages. With Bintray's full self-service platform developers have full control over their published software and how it is distributed to the world.

Nos sirve para alamcenar los "artifacts" de desarrollos que hagamos.
500MB gratis

Automáticamente te genera 4 repostorios:
  generic
  rpm
  deb
  maven

Para subir paquetes:
curl -T <FILE.EXT> -uadrianlzt:<API_KEY> https://api.bintray.com/content/adrianlzt/rpm/<UR_COOL_PACKAGE_NAME>/<VERSION_NAME>/<FILE_TARGET_PATH>

Para obtener la API_KEY: https://bintray.com/profile/edit -> API Key

Para poder subir un paquete antes tiene que exister el UR_COOL_PACKAGE_NAME en bintray.
Este lo podemos generar desde la interfaz web o via API.
La versión se genera automáticamente cuando ponemos el VERSION_NAME
FILE_TARGET_PATH es como se guardará el fichero, directorio y nombre, ejemplo http://dl.bintray.com/adrianlzt/rpm/direc1/direc2/nombre.rpm

Ejemplo: 
curl -T grafana-1.0.4-1.x86_64.rpm -uadrianlzt:444446f74325ag17783333 https://api.bintray.com/content/adrianlzt/rpm/grafana/1.0.4-1/grafana-1.0.4-1.x86_64.rpm

Una vez subido en la interfaz web deberemos publicar el paquete, y ya tendremos el repositorio disponible:
http://dl.bintray.com/adrianlzt/rpm/


## Gema para usar bintray ## https://github.com/narkisr/bintray-deploy
sudo gem install bintray_deploy
~/.configuration.rb
Configuration.for('bintray-deploy') {
  user 'adrianlzt'
  password 'api-keyapikeyapikeyapukey'
}
 
Crear un paquete en el rpm rpm:
bintray setup rpm check_multi "To be used with https://github.com/adrianlzt/puppet-monitoring" "Public Domain"

Subir una versión:
bintray deploy rpm check_multi 0.26-1.6 check_multi-0.26-1.6.noarch.rpm



## API ##
https://api.bintray.com

# Obtain repos
curl -u adrianlzt:4444444retgsdf6844444 https://api.bintray.com/repos/adrianlzt

# Create package: https://bintray.com/docs/api.html#_create_package
POST /packages/:subject/:repo
{
"name": "my-package",
"desc": "This package...",
"labels": ["persistence", "database"],
"licenses": ["Apache-2.0", "GPL-3.0"],
"vcs_url": "https://github.com/bintray/bintray-client-java.git"
}

curl -u adrianlzt:34534ob2k3jb423k4 -XPOST https://api.bintray.com/packages/adrianlzt/rpm -H "Content-Type: application/json" -d '
{
"name": "my-package",
"desc": "To be used with https://github.com/adrianlzt/puppet-monitoring",
"labels": ["puppet-monitoring"],
"licenses": ["Public Domain"],
}'

# Publicar paquete: https://bintray.com/docs/api.html#_publish_discard_uploaded_content
POST /content/:subject/:repo/:package/:version/publish
