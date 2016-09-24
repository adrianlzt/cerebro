Si queremos obtener un array de argumentos, pero mantener los que estén entre comillas simples:

"ls -la '/tmp/dir con espacios'".match(/(?:[^\s']+|'[^']*')+/g).map(function(s) {return s.replace(/'/g, "")})
