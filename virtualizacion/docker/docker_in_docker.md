https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/

Mejor idea es exponer el socket de docker al container y que ese container pueda crear containers "hermanos" (en vez de hijos).

docker run --rm -it --privileged docker:dind
