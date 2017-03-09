http://crasseux.com/books/ctutorial/Writing-a-makefile.html

El ejemplo más sencillo es compilar un programa en c cuando hagamos 'make'.

Para ello el Makefile será:
program:
	gcc file.c -o ejecutable

Tener en cuenta que es un tabulador lo que hay antes de gcc

Si queremos meter un script en bash:
$$(echo "hola")
`echo "otra opcion"`

Pillar version de un fichero:
VERSION=$$(cat VERSION)

Loops y usar la variable ($$ para que no la resuelva antes de llamar al echo):
for num in 1 2 3 4 ; do \
  echo $$num ; \
done


# Autoconf
The file 'configure.ac' (or 'configure.in') is used to create 'configure' by a program called 'autoconf'.

Tambien puede ser que necesitemos el:
autoreconf


Ejemplo de Makefile:

# This is how we want to name the binary output
BINARY=dcip_eventhandler

# These are the values we want to pass for Version and BuildTime
VERSION=0.2.0

# Setup the -ldflags option for go build here, interpolate the variable values
LDFLAGS=-ldflags "-X main.app_version=${VERSION}"

all: build rpm

build:
	go build ${LDFLAGS} -o ${BINARY} *.go

rpm:
	fpm -s dir -t rpm -n dcip_eventhandler -a x86_64 --prefix /usr/bin -v ${VERSION} ${BINARY}

