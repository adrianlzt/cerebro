from bottle import route, run, template, post, request, auth_basic 

USER="usuario" 
PASS="password" 
 
def check_pass(username, password):
    return username == USER and password == PASS
     
@post('/skype/<user>')
@auth_basic(check_pass)
def index(user):
    return "hola %s: %s\n" % (user, request.body.getvalue())

run(host='localhost', port=8080)


# Uso
# curl -u usuario:password http://localhost:8080/skype/adrianlzt -d 'ping'  
