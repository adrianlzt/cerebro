#
# v0.3.1
#
# To start just exec: make
# This will create a make_env file, where we have to define the image name and docker registries
# It will also create a dummy Dockerfile and a Jenkinsfile
#
# TODO:
#  - add README.md to the files created
#  - create a repo automatically in opensolutions git?
#  - make clean force=false, do the same as force=true
#  - create automatically hooks in the git server to call jenkins?
#

# Specific vars
include make_env

.DEFAULT_GOAL := build

# Needed to activate virtual env for tests
SHELL := /bin/bash

# Get last version from git tags
GITCURTAG = $(shell git describe --exact-match --tags HEAD 2>/dev/null)
VERSION ?= $(shell echo $(GITCURTAG) | tr -cd '[[:digit:]].')
LATESTTAG = latest

export DOCKERFILE
export JENKINSFILE
export TESTINFRA
export MAKE_ENV
name ?= CHANGEME

make_env:
	@echo "$$MAKE_ENV" > make_env
	@echo "make_env dummy created"

Dockerfile:
	@echo "$$DOCKERFILE" > Dockerfile
	@echo "Dockerfile dummy created"

Jenkinsfile:
	@echo "$$JENKINSFILE" > Jenkinsfile
	@echo "Jenkinsfile dummy created"

.git:
	git init .
	@echo -e ".cache/\n.venv/\ntests/__pycache__/" > .gitignore
	git add Makefile Jenkinsfile Dockerfile make_env .gitignore
	git commit -m "First commit"
	@echo ""

.PHONY: build
build: Jenkinsfile Dockerfile .git ## Build the docker image
ifneq ($(IMAGE_NAME),CHANGEME) # Don't build if you have not changed the default name
ifeq ($(name),CHANGEME) # Don't change if it is the first exec of Makefile and you have defined the image name
	docker build -t $(IMAGE_NAME):$(LATESTTAG) .
endif
else
	@echo -e "\e[00;31mPlease, edit 'make_env' to change the name of your image\e[00m"
	@echo "Consider also to add a remote to this git repo"
endif

.PHONY: package
package: build

.PHONY: shell
shell: build ## Open an interactive shell in our built image
	docker run --rm -it -v "${PWD}:/mnt" --name $(IMAGE_NAME)_$(LATESTTAG) --entrypoint bash $(IMAGE_NAME):$(LATESTTAG) || \
	docker run --rm -it -v "${PWD}:/mnt" --name $(IMAGE_NAME)_$(LATESTTAG) --entrypoint sh $(IMAGE_NAME):$(LATESTTAG)

.PHONY: run
run: ## Run the image in interactive mode, with --rm and exposing ports
	docker run --rm -it -P --name $(IMAGE_NAME)_$(LATESTTAG) $(IMAGE_NAME):$(LATESTTAG)

.PHONY: start
start: run

.PHONY: describe
describe: ## Obtain important information from our image (cmd, entrypoint, exports, volumes, etc) and running container
	@docker inspect -f "Img CMD: {{.Config.Cmd}}" $(IMAGE_NAME):$(LATESTTAG)
	@docker inspect -f "Img ENTRYPOINT: {{.Config.Entrypoint}}" $(IMAGE_NAME):$(LATESTTAG)
	@docker inspect -f "Img VOLUMES: {{.Config.Volumes}}" $(IMAGE_NAME):$(LATESTTAG)
	@docker inspect -f "Img EXPORTS: {{.Config.ExposedPorts}}" $(IMAGE_NAME):$(LATESTTAG)

	@docker inspect -f "" $(IMAGE_NAME)_$(LATESTTAG) >& /dev/null && \
  echo -e "\n\nRunning container:\n" && \
	docker stats --no-stream $(IMAGE_NAME)_$(LATESTTAG) && echo && \
	docker inspect -f "CMD: {{.Config.Cmd}}" $(IMAGE_NAME)_$(LATESTTAG) && \
	docker inspect -f "ENTRYPOINT: {{.Config.Entrypoint}}" $(IMAGE_NAME)_$(LATESTTAG) && \
	docker inspect -f "IP: {{.NetworkSettings.Networks.bridge.IPAddress}}" $(IMAGE_NAME)_$(LATESTTAG) && echo && \
	echo "Ports: " && \
	docker container port $(IMAGE_NAME)_$(LATESTTAG) && echo && \
	echo "Mounts: " && \
	docker inspect -f "{{ range .Mounts}}{{.Source}} -> {{.Destination}}{{end}}" $(IMAGE_NAME)_$(LATESTTAG) || \
	/bin/true # Exist without error if there is not a container running

.PHONY: changelog
changelog: ## Show commits since last tag
	@git log `git describe --tags --abbrev=0`..HEAD --oneline |  awk 'BEGIN { print "Commits since last tag:" }; {print "- " $$0}'

.PHONY: tag
tag: ## Tag the docker image for all registries configured with current git tag version and latest
	$(foreach reg,$(REGISTRY), \
		docker tag $(IMAGE_NAME):$(LATESTTAG) $(reg)/$(IMAGE_NAME):$(LATESTTAG); \
	)
ifneq ($(VERSION),)
	docker tag $(IMAGE_NAME):$(LATESTTAG) $(IMAGE_NAME):$(VERSION)
	$(foreach reg,$(REGISTRY), \
		docker tag $(IMAGE_NAME):$(LATESTTAG) $(reg)/$(IMAGE_NAME):$(VERSION); \
	)
else
	@echo -e "\n\e[00;31mDirectory do not have a git tag, nor VERSION is defined in make_env\e[00m. Only using 'latest'"
endif

.PHONY: images
images: ## Show a list of all current images with the name defined in make_env
	@docker images --format "{{.Repository}}:{{.Tag}}" | egrep "^$(IMAGE_NAME):|/$(IMAGE_NAME):"

.PHONY: push
push: ## Push latest and current git version images
	$(foreach reg,$(REGISTRY), \
    docker push $(reg)/$(IMAGE_NAME):$(LATESTTAG); \
    docker push $(reg)/$(IMAGE_NAME):$(VERSION); \
	)

tests:
	@echo -e "\n\nCreating directory tests/ with a dummy example\n\n"
	@mkdir tests
	@echo "$$TESTINFRA" > tests/test.py
	@git stash save
	@git add tests/
	@git commit -m "Add tests"
	-@git stash pop

.venv:
	@echo -e "\n\nCreating virtual env to run testinfra\n\n"
	@virtualenv .venv
	@source .venv/bin/activate && \
	pip -q install testinfra

.PHONY: test
test: tests .venv ## Run tests with testinfra. Create dummy test and virtualenv if does not exists
	@source .venv/bin/activate && \
	py.test -v tests/*.py

# TODO: force=false tambien se salta el chequeo
# https://stackoverflow.com/questions/7656425/makefile-ifeq-logical-or
# https://stackoverflow.com/questions/9008649/gnu-make-conditional-function-if-inside-a-user-defined-function-always-ev
.PHONY: clean
clean: ## Delete latest and current git version images tagged for this repo, use force=true to skip confirmation
	@echo "Deleting this images: "
	@docker inspect $(IMAGE_NAME):$(LATESTTAG) &> /dev/null && \
  echo "  $(IMAGE_NAME):$(LATESTTAG)"
	@docker inspect $(IMAGE_NAME):$(VERSION) &> /dev/null && \
  echo "  $(IMAGE_NAME):$(VERSION)"

	-@$(foreach reg,$(REGISTRY), \
		docker inspect $(reg)/$(IMAGE_NAME):$(LATESTTAG) &> /dev/null && \
    echo "  $(reg)/$(IMAGE_NAME):$(LATESTTAG)"; \
		docker inspect $(reg)/$(IMAGE_NAME):$(VERSION) &> /dev/null && \
    echo "  $(reg)/$(IMAGE_NAME):$(VERSION)"; \
	)

ifeq ($(force),)
	@echo -n "Are you sure? [y/N] " && read ans && [ $${ans:-N} == y ]
endif

	@docker inspect $(IMAGE_NAME):$(LATESTTAG) &> /dev/null && \
  docker rmi $(IMAGE_NAME):$(LATESTTAG)
	@docker inspect $(IMAGE_NAME):$(VERSION) &> /dev/null && \
  docker rmi $(IMAGE_NAME):$(VERSION)

	@$(foreach reg,$(REGISTRY), \
		docker inspect $(reg)/$(IMAGE_NAME):$(LATESTTAG) &> /dev/null && \
    docker rmi $(reg)/$(IMAGE_NAME):$(LATESTTAG); \
		docker inspect $(reg)/$(IMAGE_NAME):$(VERSION) &> /dev/null && \
    docker rmi $(reg)/$(IMAGE_NAME):$(VERSION); \
	)

.PHONY: clean-all
clean-all: ## Delete all docker images with the name defined in make_env
	@echo "Deleting this images: "
	@docker images --format "{{.Repository}}:{{.Tag}}" | egrep "^$(IMAGE_NAME):|/$(IMAGE_NAME):" | xargs -n 1 echo " "
ifeq ($(force),)
	@echo -n "Are you sure? [y/N] " && read ans && [ $${ans:-N} == y ]
endif
	@docker images --format "{{.Repository}}:{{.Tag}}" | egrep "^$(IMAGE_NAME):|/$(IMAGE_NAME):" | xargs docker rmi

.PHONY: clean-repo
clean-repo: ## Delete .git/ tests/ Dockerfile Jenkinsfile and make_env
	@# Ask for confirmation once. chown first to avoid asking for each git object file not writtable by the user
	-chmod -R u+w .git/objects/* && rm -Ir .git .gitignore
	-rm -Ir tests/ .venv/ .cache/
	@# Ask for confirmation and don't fail if command fails (- at the beggining)
	-rm -ir Dockerfile Jenkinsfile make_env

.PHONY: help
help: ## Parse Makefile and create a list of commands a its descriptions
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


# Dummy make_env
define MAKE_ENV
IMAGE_NAME = $(name)
REGISTRY = 
#VERSION = 0.1.0
endef

# Dockerfile best practices
define DOCKERFILE
# Las instrucciones deben organizarse para aprovechar el cacheo de capas
# Arriba las instrucciones que no vayan a ser modificadas

# Multistage build para compilar codigo fuente y generar binarios
# que copiaremos en una imagen final sin las dependencias de build
#
# Requisitos: Docker 17.05 o superior
#
FROM debian:stable as builder

# Usaremos este dir para bajar fuentes y compilar
WORKDIR /app

# Para instalar paquetes usaremos RUNs con esta estructura
# Intentaremos solo realizar una instalacion de paquetes para acelerar el build
# No hace falta limpiar el cache de apt porque descartaremos esta imagen
RUN apt-get update && apt-get install -y \
    package-bar \
    package-baz \
    package-foo

# Comandos para copiar/descargar el codigo fuente.
# Usaremos el COPY o el ENV+RUN (deberemos haber instalado curl)
COPY . /app
ENV VERSION v0.4.1
RUN curl -sSL https://github.com/foo/bar/archive/${VERSION}.tar.gz | tar zx --strip-components=1

# Ejecutaremos comando que realice la compilacion
RUN ./configure && make



# Imagen final, copiando los binarios del "builder" y puede que dependencias
FROM debian:stable-slim
MAINTAINER XXX <XXX@opensolutions.cloud>

# Estas capas no son susceptibles de cambiar, por lo que se definen al comienzo
# Definiremos en el entrypoint el comando principal del container
# Tambien puede ser un script que realice un arranque mas complejo
ENTRYPOINT ["/usr/bin/foo"]
# Y sus argumentos tipicos de arranque en el CMD, o la ayuda en caso de no tener
CMD ["--help"]

# Si necesitamos instalar algo seguiremos este esquema para reducir el tamaño de la capa
RUN apt-get update && apt-get install -y \
    package-bar \
    package-baz \
    package-foo && \
    rm -fr /var/lib/apt/lists/*

# Copiamos el binario generado en la imagen de compilacion
COPY --from=builder /app/file /usr/bin/foo

# Si tenemos que copiar un fichero o directorio usaremos ADD
COPY --chown=user:group <src> <dest>

# Como buena politica debemos no correr el cotainer como root
# Cuidado, porque tras esta instruccion no tenemos permisos de root (no podemos instalar)
USER someuser
endef

# Jenkinsfile best practices
define JENKINSFILE
pipeline {
    agent {
    		label "docker"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh "make"
            }
        }
        stage('Test') {
            steps {
                sh "make test"
            }
        }
        stage('Tag') {
            steps {
                sh "make tag"
            }
        }
        stage('Push') {
            steps {
                sh "make push"
            }
        }
    }
}
endef

define TESTINFRA
import pytest
import subprocess
import testinfra

@pytest.fixture(scope='session')
def host(request):
    # run the container
    docker_id = subprocess.check_output(
        ['docker', 'run', '-d', '$(IMAGE_NAME):$(LATESTTAG)']).decode().strip()
    # return a testinfra connection to the container
    yield testinfra.get_host("docker://" + docker_id)
    # at the end of the test suite, destroy the container
    subprocess.check_call(['docker', 'rm', '-f', docker_id])


def test_linux_distribution(host):
    # 'host' now binds to the container, executing the commands as with exec
    assert host.check_output('egrep "^ID" /etc/os-release') == 'ID=debian'

def test_always_fail(host):
    assert host.check_output('echo fail') == 'works'
endef

# vim:ft=make
#
