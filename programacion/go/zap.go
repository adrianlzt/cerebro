package main

/*
* Ejemplos del stderr que genera:
2019-04-04T12:23:02.136+0200    INFO    tmp.7VaWfCopB0/main.go:14       failed to fetch URL   {"url": "asda", "attempt": 3}
2019-04-04T12:23:02.137+0200    INFO    tmp.7VaWfCopB0/main.go:18       Failed to fetch URL: asdas
2019-04-04T12:23:02.137+0200    INFO    tmp.7VaWfCopB0/main.go:36       dentro de foo   {"foo":"bar"}
2019-04-04T12:23:02.137+0200    INFO    inBar   tmp.7VaWfCopB0/main.go:41       dentro de bar {"foo": "bar"}
2019-04-04T12:23:02.137+0200    INFO    inBar.sub       tmp.7VaWfCopB0/main.go:42       sub enbar     {"foo": "bar"}
2019-04-04T12:23:02.137+0200    INFO    tmp.7VaWfCopB0/main.go:32       test mensaje a fichero
*/

import (
	"go.uber.org/zap"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()
	sugar := logger.Sugar()
	sugar.Infow("failed to fetch URL",
		"url", "asda",
		"attempt", 3,
	)
	sugar.Infof("Failed to fetch URL: %s", "asdas")

	foo(sugar.With("foo", "bar"))

	// Logear a un fichero y stderr
	cfg := zap.NewDevelopmentConfig()
	cfg.OutputPaths = []string{
		"stderr",
		"test.log",
	}
	// Cambiar el nivel de logging
	cfg.Level.SetLevel(zap.InfoLevel)
	loggerFile, err := cfg.Build()
	if err != nil {
		panic(err)
	}
	defer loggerFile.Sync() // Si pongo stderr como fichero y no escribo nada, me salla el sync al salir (sync /dev/stderr: invalid argument)
	loggerFile.Info("test mensaje a fichero")
}

func foo(sugar *zap.SugaredLogger) {
	sugar.Info("dentro de foo")
	bar(sugar.Named("inBar"))
}

func bar(sugar *zap.SugaredLogger) {
	sugar.Info("dentro de bar")
	sugar.Named("sub").Info("sub en bar")
}
