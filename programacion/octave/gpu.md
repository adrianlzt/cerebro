https://developer.nvidia.com/blog/drop-in-acceleration-gnu-octave/

Podemos hacer uso de la potencia de GPUs NVIDIA simplemente cargando otra libreria "BLAS"
LD_PRELOAD=libnvblas.so octave ./sgemm.m



Tendremos que tener en el CWD un fichero nvblas.conf con (o definir la ubicación del fichero con NVBLAS_CONFIG_FILE):
#Put here the CPU BLAS fallback Library of your choice
NVBLAS_CPU_BLAS_LIB libopenblas.so

# Specify which output log file (default is stderr)
NVBLAS_LOGFILE nvblas.log

# List of GPU devices Id to participate to the computation
# By default if no GPU are listed, only device 0 will be used
NVBLAS_GPU_LIST 0 1
NVBLAS_AUTOPIN_MEM_ENABLED

Yo he puesto el fichero en $HOME/.config/nvblas.conf
