https://pytorch.org/get-started/locally/

En arch linux me da problemas de dependencias al intentar usar pytorch instalado con pacman y otras deps con pipenv.

Mejor aislarlo usando conda.

La versión actual de pytorch no soporta cuda 11.6 (la última soportada por arch).
Downgrade a 11.3.1

Creo un entorno de conda para "ml":
conda create -n ml

Lo activo e instalo pytorch:
conda activate ml
conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch

