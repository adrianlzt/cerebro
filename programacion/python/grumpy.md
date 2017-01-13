https://github.com/google/grumpy

Grumpy is a Python to Go source code transcompiler and runtime.

Convertir programa python en binario go.

Creo que si usa extensiones en c no funciona, solo pure python.


Hace falta usar python2.7
python debe ser python2.7 (cd /usr/bin; rm python; ln -s python2 python)

git clone git@github.com:google/grumpy.git
cd grumpy

% echo "print 'hello, world'" | make run
hello, world

