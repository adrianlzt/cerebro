https://www.docker.com/blog/introduction-to-heredocs-in-dockerfiles/

No funciona con podman build: https://github.com/containers/buildah/issues/3474

COPY <<EOF /usr/share/nginx/html/index.html
(your index page goes here)
EOF
