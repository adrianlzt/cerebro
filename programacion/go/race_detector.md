antiguo: https://blog.golang.org/race-detector
https://golang.org/doc/articles/race_detector.html


$ go test -race mypkg    // to test the package
$ go run -race mysrc.go  // to run the source file
$ go build -race mycmd   // to build the command
$ go install -race mypkg // to install the package


Si tenemos el error 
failed to restore the stack

Podemos usar:
```
history_size (default 1): The per-goroutine memory access history is 32K * 2**history_size elements. Increasing this value can avoid a "failed to restore the stack" error in reports, at the cost of increased memory usage.

GORACE=history_size=7
```

Otras posibles estrategías:
https://github.com/golang/go/issues/10661#issuecomment-99002055
