https://kataras.gitbooks.io/iris/content/static-files.html

Es muy sencillo servir fichero estaticos:
iris.Static("/public", "./static/", 1)

curl localhost:8080/public/fichero.png
Me da ./static/fichero.png

curl localhost:8080/public/dir/fichero.png
Me da ./static/dir/fichero.png
