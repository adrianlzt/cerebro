Ejemplo de como gestiona telegraf el reload y parada

import "os/signal"

signals := make(chan os.Signal)
signal.Notify(signals, os.Interrupt, syscall.SIGHUP,
  syscall.SIGTERM, syscall.SIGINT)
go func() {
  select {
  case sig := <-signals:
    if sig == syscall.SIGHUP {
      log.Printf("I! Reloading Telegraf config")
      <-reload
      reload <- true
    }
    cancel()
  case <-stop:
    cancel()
  }
}()


