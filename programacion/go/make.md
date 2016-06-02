https://ariejan.net/2015/10/03/a-makefile-for-golang-cli-tools/

Makefile:
# This is how we want to name the binary output
BINARY=roll

# These are the values we want to pass for Version and BuildTime
VERSION=1.0.0
BUILD_TIME=`date +%FT%T%z`

# Setup the -ldflags option for go build here, interpolate the variable values
LDFLAGS=-ldflags "-X github.com/ariejan/roll/core.Version=${VERSION} -X github.com/ariejan/roll/core.BuildTime=${BUILD_TIME}"

all:
	go build ${LDFLAGS} -o ${BINARY} main.go



Para algo más sencillo, en el main de nuestro codigo:
var (
		version_app = "NA"
)

LDFLAGS=-ldflags "-X main.version_app=1.5"
