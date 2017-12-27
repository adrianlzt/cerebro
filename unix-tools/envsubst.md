https://unix.stackexchange.com/questions/294378/replacing-only-specific-variables-with-envsubst
Sustituir de un fichero variables por los sus valores definidos en las variables de entorno:

envsubst < test.tml > config.conf


echo 'test1: ${TEST1}\ntest2: ${TEST2}\ntest3: ${TEST3}' > test.tml

$ TEST1=A envsubst < test.tml
test1: A
test2:
test3:

$ TEST1=A TEST2=B TEST3=C envsubst < test.tml
test1: A
test2: B
test3: C


Solo cambiar las variables especificadas:
$ TEST1=A TEST2=B TEST3=C envsubst '${TEST1},${TEST3}' < test.tml
test1: A
test2: ${TEST2}
test3: C
