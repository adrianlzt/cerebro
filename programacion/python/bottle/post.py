from bottle import run, post, request

# Ejemplo de curl
# curl -XPOST localhost:9000/user/pepe -H "Content-Type: application/json" -d '{"nombre":"juan", "edad":34}'

@post('/user/<user>')
def index(user):
    edad = request.son['edad']
    return "hola %s. edad=%s \n" % (user,edad)

run(host='localhost', port=9000)
