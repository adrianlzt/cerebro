# TODO Mirar https://medium.com/better-programming/my-ultimate-makefile-for-golang-projects-fcc8ca20c9bb

# This is how we want to name the binary output
BINARY=check_openstack

# These are the values we want to pass for Version and BuildTime
VERSION=$$(cat VERSION)

# Setup the -ldflags option for go build here, interpolate the variable values
LDFLAGS=-ldflags "-X main.versionApp=${VERSION}"

all: validation test build

test:
	echo "ToDo" #go test ...

build:
	go build ${LDFLAGS} -o scripts/${BINARY} sources/*.go

get_dep_tool:
	go get -u github.com/golang/dep/...

fmt:
	gofmt -s -w sources/

vet:
	go vet github.com/Telefonica/dsmctools-openstack-checks/sources

lint:
	golint sources/

ineffassign:
	ineffassign sources/

validation: fmt vet lint ineffassign

