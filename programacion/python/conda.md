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

Si el paquete no está en los repos de conda, podemos usar pip. Pero lo recomendable es usar siempre que se pueda conda.
https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#using-pip-in-an-environment

Ver paquetes instalados
conda list
