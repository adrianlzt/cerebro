https://www.slideshare.net/brendangregg/container-performance-analysis

mirar stats.md



nsenter -t PID -u hostname
obtener el hostname del container al que pertenece ese PID

nsenter -t PID -m -p top
correr top en el container de pid PID




At DockerCon last week, Netflix stated that the containers have a < 0.1% performance penalty at runtime
(https://mariadb.com/resources/blog/get-started-mariadb-docker May'17)


Storing the data inside the container adds more overhead, it impacts the I/O to the file-system. In the case of a container, this is the ‘union’ file-system (or AUFS) that the image is created from. Using a mounted volume means that you are writing directly to the host's file-system (e.g., EXT4, XFS), so you should have better performance.
