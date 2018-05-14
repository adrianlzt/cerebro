https://boyter.org/posts/how-to-start-go-project-2018/#multiple-main-entry-points

Si queremos tener varios entrypoints para un mismo proyecto, seguiremos esta estructura:

SRC
├── cmd
│   ├── commandline
│   │   └── main.go
│   ├── webhttp
│   │   └── main.go
│   ├── convert1.0-2.0
│   │   └── main.go


En cada main tendremos que importar la estructura raiz
package main

import (
  "github.com/name/mycode"
  )
