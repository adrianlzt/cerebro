http://virtualenvwrapper.readthedocs.org/en/latest/
http://virtualenvwrapper.readthedocs.org/en/latest/command_ref.html

# Instalacion
sudo pip install virtualenvwrapper

# Setup
/usr/local/bin/virtualenvwrapper.sh
  Crea ~/.virtualenvs

Añadir a ~/.bashrc
# Virtual env wrappers
export WORKON_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

# Funcionamiento
mkvirtualenv proyecto
  creamos y entramos en un nuevo vevn que se llama "proyecto"
  nos genera los ficheros en ~/.virtualenvs/proyecto
  -a project_path   Provide a full path to a project directory to associate with the new environment
  -i package    Install a package after the environment is created. This option may be repeated
  -r requirements_file   Provide a pip requirements file to install a base set of packages into the new environment

workon proyecto
  nos carga el venc "proyecto"

Ficheros interesantes:
  ~/.virtualenvs/postmkvirtualenv 
    Ejecutar algo tras crear cualquier mkvirtualenv

  ~/.virtualenvs/postactivate
    ejecutar algo tras hacer un workon

  ~/.virtualenvs/proyecto/bin/postactivate
    Podemos cargar que operaciones queremos ejecutar tras entrar en el venv. 
    Por ejemplo cargar ciertas variables de entorno, o entrar en el directorio donde tenemos el codigo


rmvirtualenv nombre
  borrar venv

lsvirtualenv
  mostrar venvs
   -b -- brief mode
   -l -- long mode

lssitepackages
  mostrar paquetes instalados en el venv

add2virtualenv directory1 directory2 ...
  Adds the specified directories to the Python path for the currently-active virtualenv. This will be done by placing the directory names in a path file named


# Templates
http://virtualenvwrapper.readthedocs.org/en/latest/extensions.html#extensions-templates

imkproject -t bitbucket -t django my_site
