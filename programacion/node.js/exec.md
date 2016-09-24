const spawn = require('child_process').spawn;

msg = "ls -lh '/tmp/con espacio'"
args = msg.match(/(?:[^\s']+|'[^']*')+/g).map(function(s) {return s.replace(/'/g, "")})

const ls = spawn('ls', args);
ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          });

