https://developer.github.com

Generar token:
settings/tokens


gem install github_api
require 'github_api'

Auth:
github = Github.new login:'adrianlzt', password:'...'

Con OAuth:
github = Github.new oauth_token: 'token'


Mostrar los repos de USER
Github.repos.list user: 'USER'

Mostrar releases de un repo:
l = github.repos.releases.list 'adrianlzt', 'pruebas-assets'
l[0]["tag_name"]

Crear release:
github.repos.releases.create 'adrianlzt', 'pruebas-assets', '1.0', name="nombre", body="cuerpo largo"



Tambien tiene CLI:
gem install github_cli
gcli

Configuración: ~/.githubrc
Generarla:
gcli init
gcli config user.token dfg6sdnx9....
  mirar github.md Token para ver como crearlo

### RELEASES via API ###

Obtener releases de un repo:
curl -H "Authorization: token XXXX" https://api.github.com/repos/adrianlzt/pruebas-assets/releases

Crear release:
curl -XPOST https://api.github.com/repos/adrianlzt/pruebas-assets/releases -H "Content-Type: application/json" -H "Authorization: token XXXX" -d '
{
  "tag_name": "1.3",
  "target_commitish": "master",
  "name": "1.3",
  "body": "Description of the release",
  "draft": false,
  "prerelease": false
}

De ahí pondemos obtener los datos para poder subir un asset (nos pone la url entera):
curl -H "Authorization: token TOKEN" \
     -H "Accept: application/vnd.github.manifold-preview" \
     -H "Content-Type: application/octet-stream" \
     --data-binary @build/package.rpm \
     "https://uploads.github.com/repos/hubot/singularity/releases/ID_DE_LA_QUERY_ANTERIOR/assets?name=1.0.0-package.rpm"

