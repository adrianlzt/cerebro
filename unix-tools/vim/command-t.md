https://wincent.com/blog/command-t-1.0.1-released
http://git.wincent.com/command-t.git/blob_plain/HEAD:/doc/command-t.txt

Instalar con vundle
Plugin 'https://github.com/wincent/Command-T.git'

Requisitos:
vim --version | grep ruby
  Debe aparecer un "+ruby"

Instalacion (en Fedora: yum install vim-command-t)
cd ~/.vim/bundle/Command-T/ruby/command-t
ruby extconf.rb
make


Uso:
,t
  abrir ventana para seleccionar un nuevo fichero a editar
  si escribimos algo nos va filtrando los ficheros que puedan valer

Enter  nos abre el fichero
C-enter  abre en split horizontal (no me funciona)
C-v  nos abre el fichero en un split vertical
C-t  nos abre el fichero en un nuevo tab
C-c  salir
Tab  saltar a la ventana de selección de ficheros
