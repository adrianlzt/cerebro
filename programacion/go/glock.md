https://github.com/robfig/glock
go get github.com/robfig/glock

Gestor de dependencias.

Se define un fichero GLOCKFILE con contenido, por ejemplo:
github.com/BurntSushi/toml 056c9bc7be7190eaa7715723883caffa5f8fa3e4
github.com/fsouza/go-dockerclient e0d22d30691bcc996eca51f729a4777b8c7dc2a8

Para obtenerlas:
glock sync -n < GLOCKFILE
