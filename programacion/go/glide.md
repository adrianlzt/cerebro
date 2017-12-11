https://glide.sh/
https://github.com/Masterminds/glide
Package Management for Golang

Con comandos para facilitar la gestión

Install:
curl https://glide.sh/get | sh


glide init
glide update
  baja deps y genera el fichero .lock
glide install
  instala deps segun el fichero .lock (si no existe lanza un update)

Usado por:


Fichero glide.yml tipo:
package: github.com/Masterminds/glide
homepage: https://glide.sh
license: MIT
owners:
- name: Matt Butcher
  email: technosophos@gmail.com
  homepage: http://technosophos.com/
- name: Matt Farina
  email: matt@mattfarina.com
  homepage: https://www.mattfarina.com/
import:
- package: gopkg.in/yaml.v2
- package: github.com/Masterminds/vcs
