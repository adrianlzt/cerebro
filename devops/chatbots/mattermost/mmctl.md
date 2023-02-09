CLI de administración.

Crearnos un token en nuestro user.
echo "TOKEN" > token
mmctl auth login -t token -n NOMBREINSTANCIA https://mattermost.url.com

Ver config:
mmctl config show


# Kubernetes
La config se almacena en la mysql.
Tabla Configurations.

Si queremos modificarla tenemos que hacerlo en el secret
https://github.com/mattermost/mattermost-helm/blob/master/charts/mattermost-team-edition/templates/secret-config.yaml
