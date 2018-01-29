https://api.mattermost.com/

# Login
curl -i -d '{"login_id":"someone@nowhere.com","password":"thisisabadpassword"}' http://localhost:8065/api/v4/users/login

Coger la cabecera "token: "
El resto de peticiones las haremos con:
curl -i -H 'Authorization: Bearer hyr5dmb1mbb49c44qmx4whniso' http://localhost:8065/api/v4/users/me
