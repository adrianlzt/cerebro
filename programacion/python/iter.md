https://docs.python.org/2/library/functions.html#iter

Iterar por un fichero o pipe:

with open('mydata.txt') as fp:
    for line in iter(fp.readline, ''):
        process_line(line)

Lee el fichero hasta que encuentre el caracter vacío ('')
