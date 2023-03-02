https://docs.docker.com/engine/reference/run/#specify-an-init-process
https://ddanilov.me/how-to-contain-a-crashed-container/
https://ddanilov.me/how-signals-are-handled-in-a-docker-container
https://ddanilov.me/how-to-configure-core-dump-in-docker-container

This indicates that an init process should be used as the PID 1 in the container. Specifying the init process ensures that the usual responsibilities of an init system, such as reaping zombie processes and default signal handling, are performed inside of the created container.

/sbin/docker-init, basado en tini
