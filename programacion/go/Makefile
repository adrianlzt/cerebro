# This is how we want to name the binary output
BINARY=notifier

# These are the values we want to pass for Version and BuildTime
VERSION=0.1.0

# Setup the -ldflags option for go build here, interpolate the variable values
LDFLAGS=-ldflags "-X main.app_version=${VERSION}"

all:
	go build ${LDFLAGS} -o ${BINARY} *.go
