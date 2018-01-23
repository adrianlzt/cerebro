https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents
http://skramm.blogspot.fr/2012/04/gnu-make-and-foreach-function.html
http://www.cmcrossroads.com/cm-articles/columns/ask-mr-make
https://www.cmcrossroads.com/article/basics-gnu-make
https://www.cmcrossroads.com/article/painless-non-recursive-make


http://crasseux.com/books/ctutorial/Writing-a-makefile.html
La idea es dar una serie de reglas a "make" para que sepa que debe recompilar.
Según el timestamp de los distintos ficheros y las relaciones entre los ficheros conseguirá solo recompilar las partes necesarias.
El típico ejemplo es un programa en c con headers, source files, objects files y el binario.
Al modificar un fichero make, gracias a las reglas del Makefile, sabrá que cosas debe recompilar, evitando tener que recompilar todo el proyecto.

Si hacemos make, se ejecutará el primer "goal" disponible (que no empieze por punto)

Una opción típica al compilar es que los targets y los requisites sean ficheros.
Y vamos poniendo en cada target los ficheros que hacen falta para compilar este.
De esta manera vamos creando una jerarquía, que en el caso de modificar algún fichero, make sabrá que tiene que recompilar para cumplir con todos los target.
Ejemplo: http://crasseux.com/books/ctutorial/A-simple-makefile.html#A%20simple%20makefile



Esquema básico:
target ... : prerequisites ...
  command


Variables
nombre = valor de la variable
La usamos como: $(nombre)


https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
Si queremos crear targets custom que no sean compilaciones de ficheros, usaremos .PHONY para decirle a make que no intente buscar un fichero con el nombre del target (irá más rápido al no tener que hacer ciertos chequeos):
.PHONY : clean
clean :
  rm edit $(objects)

Tambien podemos definir todos los PHONY al final:
.PHONY: build docker-run ...



Definir un goal/target por defecto:
.DEFAULT_GOAL := help



make -n XXX
  es un dry-run, nos muestra lo que va a ejecutar


El ejemplo más sencillo es compilar un programa en c cuando hagamos 'make'.

Para ello el Makefile será:
program:
	gcc file.c -o ejecutable

Tener en cuenta que es un tabulador lo que hay antes de gcc

Si hacemos make sin tener Makefile ejecutará:
make test -> gcc test.c -o test
Tambien vale, al menos, para c++


Si queremos meter un script en bash:
$$(echo "hola")
`echo "otra opcion"`
VAR := $(shell curl http://httpbin.org/get)

Asignar variable dentro de un target (https://stackoverflow.com/questions/1909188/define-make-variable-at-rule-execution-time/1909390):
$(eval $@_GROUP_ID=$(shell curl -s --header "$(GIT_AUTH_HEADER)" http://localhost:8070/api/v4/groups/opensolutions | jq '.id'))

Pillar version de un fichero:
VERSION=$$(cat VERSION)
mejor usar include


Loops y usar la variable ($$ para que no la resuelva antes de llamar al echo):
for num in 1 2 3 4 ; do \
  echo $$num ; \
done


# Autoconf
The file 'configure.ac' (or 'configure.in') is used to create 'configure' by a program called 'autoconf'.

Parece que lo tipico es ejecutar:
aclocal -I m4
autoconf
autoheader
automake -a
automake



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



# Leer de user:
test:
  read -p "Dime tu user de LDAP: " user; \
  read -p "Dime tu pass de LDAP: " pass; \
  echo "Tus cred son $$user $$pass"


Preguntar al usuario:
https://stackoverflow.com/questions/47837071/making-make-clean-ask-for-confirmation
clean: check_clean
	rm -fr dist/

check_clean:
	@echo -n "Are you sure? [y/N] " && read ans && [ $${ans:-N} == y ]



# Definir comandos de un target
@comando
  esto hará que make no muestre el comando antes de ejecutarlo

-comando
  esto hace que el comando tenga RC=0, asi que seguirá ejecutando el resto de cmds del target
  podemos combinarlo con @ de cualquier manera: "-@" o "@-"


# Trabajando con strings
https://www.gnu.org/software/make/manual/make.html#Text-Functions

$(subst ee,EE,feet on the street)
  devuelve "fEEt on the strEEt"

$(sort foo bar lose)




# Trabajando con nombres de ficheros
https://www.gnu.org/software/make/manual/make.html#File-Name-Functions

Coger solo el directorio, solo el nombre, poner prefijos, sufijos, etc




# Condicionales
https://www.gnu.org/software/make/manual/make.html#Conditional-Syntax
https://www.gnu.org/software/make/manual/make.html#Conditional-Functions

$(if condition,then-part[,else-part])

target:
ifneq ($(FOO),)
	some command
else
  $(error no definida)
endif

FOO no definida -> error
FOO definida "" -> error
FOO definida con un valor -> some

Si usamos "include fichero" y en ese fichero ponemos algo tipo:
FOO = `cat fichero`
si fichero no existe tambien ejecutará "some"

Otra forma que si funciona bien con el caso anterior:
@if [[ "${FOO}" ]]; then \
	echo "mas de 0 words"; \
fi

No meter $(error dentro del if, porque se evaluará antes y saltará el error.



ifeq ($(TARGET_CPU),x86)
  TARGET_CPU_IS_X86 := 1
else ifeq ($(TARGET_CPU),x86_64)
  TARGET_CPU_IS_X86 := 1
else
  TARGET_CPU_IS_X86 := 0
endif



# Bucles
https://www.gnu.org/software/make/manual/make.html#Foreach-Function

$(foreach var,list,text)

@$(foreach reg,$(REGISTRY), \
  echo $(reg); \
  echo xxx; \
)



# Parámetros
make run force=true
  dentro tendremos la variable "${force}"



# Variables multilinea
https://stackoverflow.com/questions/649246/is-it-possible-to-create-a-multi-line-string-variable-in-a-makefile

define VAR
una linea
otra linea
endef

export VAR

target:
	@echo "$$VAR"


# Convertir un fichero en otro
env.mk: env.sh
	cat $< | sed 's/"//g ; s/=/:=/' > $@

Creo que lo que hace es coger el fichero env.sh y generar el fichero env.mk tras el sed



# Ejecutar programas
https://stackoverflow.com/questions/22999306/makefile-variable-assignment-executes-early

$(eval $@_GIT_REMOTE_SSH=$(shell curl -fSs --header "$(GIT_AUTH_HEADER)" $(GIT_SERVER)/api/v4/projects/$($@_GIT_PROJECT_ID) | jq -re '.ssh_url_to_repo'))
  esto asignará el resultado del curl a la variable NOMBRE-TARGET_GIT_REMOTE
  se hará al cargar el target, antes de ejecutar cualquier instrucción

Otra forma, usando la shell. La idea es pasar todo lo de ejecutar a la shell y que makefile lo ignore
GIT_REMOTE_SSH=$$(curl -sSf http://eth0.me) && \
echo "$${GIT_REMOTE_SSH}"

  Con las dobles $$ lo que estamos haciendo es que eso no lo resuelva make y envie a la shell: $(curl...) y ${GIT_REMOTE_SSH}
  Deben formar parte del mismo comando (unido con &&, ; o algo similar) para que la variable siga estando disponible

GIT_REMOTE_SSH2=$$(set -o pipefail; curl -fsS http://httpbin.org/gett | jq '.url')
  Esta modificacion hace que si el curl falla se detenga la ejecucción.
  Sin el pipefail, jq se ejecuta correctamente y se devuelve RC=0 y continua

Tambien podemos partir la linea si se nos hace muy grande:
GIT_REMOTE_SSH2=$$(set -o pipefail; \
                curl -fsS http://httpbin.org/gett | \
                jq '.url')


## Python
Podemos correr programas python dentro del Makefile

export PY

all:
  @echo "Makefile needs your attention"
  @python -c "$$PY"

define PY
import time
print("init")
time.sleep(1)
print("dos")
for i in [1,2,3]:
  print("uno %s" % i)
print("terminamos")
endef



# Logging
$(error mi mensaje que va a parar la ejecuccion)
$(warning mi mensaje warning, sale con "Makefile:5" delante (el num de linea))
$(info mi mensaje info, sale como un echo)


# Dependencies / parent
Para saber a que GOAL hemos llamado tenemos la variable: MAKECMDGOALS
Podemos usarlo para saber si hemos llamado a un target directamente o es una dependencia de otro.


# Debug
Usar "remake" para hacer debugging
