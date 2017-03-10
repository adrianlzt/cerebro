#
# Makefile
# Adrián López Tejedor, 2017-02-24 12:03
#

VERSION=$$(cat VERSION)
NAME="tools/nombre"

all: build tag upload

build:
	docker build -t ${NAME} .

tag:
	@echo "Tageando artifactory.com/${NAME}:${VERSION} y latest"
	docker tag "${NAME}:latest" "artifactory.com/${NAME}:${VERSION}"
	docker tag "${NAME}:latest" "artifactory.com/${NAME}:latest"

upload:
	@echo "Pusheando artifactory.com/${NAME}:${VERSION} y latest"
	docker push "artifactory.com/${NAME}:${VERSION}"
	docker push "artifactory.com/${NAME}:latest"

tag_and_upload: tag upload



# vim:ft=make
#
