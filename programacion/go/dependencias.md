https://wiki.archlinux.org/index.php/Go#.24GOPATH
mkdir -p ~/go/{bin,src}

meter en el .bashrc:
export GOPATH=~/go



Instalar dep:
go get github.com/rcrowley/go-metrics
