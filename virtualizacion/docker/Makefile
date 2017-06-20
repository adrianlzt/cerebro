#
# Makefile
# Adrián López Tejedor, 2017-02-24 12:03
#
# Otra opcion es usar la cli de drone.io y usar ficheros .docker.yml para lo que suelo hacer aqui
#

VERSION=$$(cat VERSION)
NAME="tools/nombre"

all: build tag upload

build:
	docker build -t ${NAME} .

tag:
	@echo "Tageando ${NAME}:${VERSION} y latest"
	docker tag "${NAME}:latest" "${NAME}:${VERSION}"
	docker tag "${NAME}:latest" "${NAME}:latest"

upload:
	@echo "Pusheando ${NAME}:${VERSION} y latest"
	docker push "${NAME}:${VERSION}"
	docker push "${NAME}:latest"

tag_and_upload: tag upload



# vim:ft=make
#
