antiguo: https://blog.golang.org/race-detector
https://golang.org/doc/articles/race_detector.html


$ go test -race mypkg    // to test the package
$ go run -race mysrc.go  // to run the source file
$ go build -race mycmd   // to build the command
$ go install -race mypkg // to install the package
