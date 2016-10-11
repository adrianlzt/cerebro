> "adrian lopez - adri@gmail.com".match("adrian [a-z]*")[0]
'adrian lopez'


> "adrian lopez - adri@gmail.com".match(".*- (adri@gmail.com)")[1]
'adri@gmail.com'


Si queremos obtener un array de argumentos, pero mantener los que estén entre comillas simples:

"ls -la '/tmp/dir con espacios'".match(/(?:[^\s']+|'[^']*')+/g).map(function(s) {return s.replace(/'/g, "")})
