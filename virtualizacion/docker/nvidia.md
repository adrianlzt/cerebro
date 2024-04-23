Roles para instalar con ansible:
nvidia.nvidia_driver
nvidia.nvidia_docker

Testear si funciona:
docker run --rm --gpus all nvidia/cuda:12.1.1-runtime-ubuntu22.04 nvidia-smi
