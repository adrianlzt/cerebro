Gestion de paquetes para python

Install en arch:
python-conda

Crear un virtualenv a partir de un fichero:
conda env create -f environment.yml

Crear un entorno desde 0 (lo mete en ~/.conda/envs/NOMBRE):
conda create -n NOMBRE

Activar un venv
conda activate nerf


Create an environment with any version of Python with:
conda create -n myenv python=3.6

Install package with:
conda install flake8

Instalar de otro repo (channel):
conda install -c conda-forge ogb

Ver paquetes instalados
conda list
