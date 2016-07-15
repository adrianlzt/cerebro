Podemos añadir addons que nos den más funcionalidad.

Listar los que tenemos activos:
heroku addons

# heroku-postgresql
Parece que es gratuito añadirlo

Para obtener los datos de conexión:
heroku config

Ejemplo de lo que devuelve
DATABASE_URL: postgres://aerqara:sdnud89rt2o34@ec2-54-75-132-4.eu-west-1.compute.amazonaws.com:5432/nisd983n

Configuración con sqlalchemy:
engine = create_engine(env["DATABASE_URL"], echo=True)

Para el entorno local definir la variable (tras crear el user en postgres de nuestro user y la bbdd):
export DATABASE_URL=postgres:///$(whoami)


Más datos respecto a la postgres:
heroku pg

Para conectar al cli de postgres:
heroku pg:psql

# redis
heroku redis:cli --app nombreapp
