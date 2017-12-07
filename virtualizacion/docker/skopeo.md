https://github.com/runcom/skopeo

Get information about containers' images without downloading them

Permite hacer copias entre registries.



# Montarnos un registry (un hub.docker.com)
https://hub.docker.com/_/registry/

docker run -d -p 5000:5000 --restart always -v "${PWD}/data:/var/lib/registry" --name registry registry:2.6.2
