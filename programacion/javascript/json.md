http://www.json.org/js.html

var myJSONObject = {
"bindings": [
        {"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"},
        {"ircEvent": "PRIVMSG", "method": "deleteURI", "regex": "^delete.*"},
        {"ircEvent": "PRIVMSG", "method": "randomURI", "regex": "^random.*"}
    ]
};

myJSONObject.bindings[0].method    // "newURI"



# Objecto a json
JSON.stringify()

# JSON a objecto
JSON.parse()
