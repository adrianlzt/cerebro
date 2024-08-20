<https://www.docker.com/blog/introduction-to-heredocs-in-dockerfiles/>

No funciona con podman build: <https://github.com/containers/buildah/issues/3474>
Si funciona a partir de buildah v1.33.0
Con los $ no funciona bien, no consigo meter un "$" en el contenedor.

COPY <<EOF /usr/share/nginx/html/index.html
(your index page goes here)
EOF
