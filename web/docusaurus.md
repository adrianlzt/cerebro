https://docusaurus.io/showcase

Server para montar una página web de documentación sencilla y bonita.

Podemos usar markdown para cosas sencillas o usar react si queremos cosas más elaboradas.

# Contenido

## Pages
Páginas simples.

Crear un markdown en src/pages/


# Deploy usando docker
npx create-docusaurus@latest my-website classic

docker run -d --name=docusaurus \
-p 8080:80 \
-v $PWD:/docusaurus \
-e TARGET_UID=1000 \
-e TARGET_GID=1000 \
-e AUTO_UPDATE=true \
-e WEBSITE_NAME="my-website" \
-e TEMPLATE=classic \
awesometic/docusaurus

