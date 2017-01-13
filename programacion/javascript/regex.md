> "adrian lopez - adri@gmail.com".match("adrian [a-z]*")[0]
'adrian lopez'


> "adrian lopez - adri@gmail.com".match(".*- (adri@gmail.com)")[1]
'adri@gmail.com'


Si queremos obtener un array de argumentos, pero mantener los que estén entre comillas simples:

"ls -la '/tmp/dir con espacios'".match(/(?:[^\s']+|'[^']*')+/g).map(function(s) {return s.replace(/'/g, "")})


Eliminar las etiquetas html de un texto:
> msg
'<at id="28:70e98884-ed21-4afd-af0a-1047449218cb">skynet_api_ai</at> quiero crear <a href="mailto:adrian@null.com">adrian@null.com</a> una wo'
> msg.replace(/<[a-zA-Z]+[^>]+>([^<]+)<\/[a-zA-Z]+\>/g, "$1")
'skynet_api_ai quiero crear adrian@null.com una wo'

