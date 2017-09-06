https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

The environment variables are embedded during the build time. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime
Si queremos añadir env vars en build, usaremos REACT_APP_NOMBRE


Otra opción es cargar en el index.html una variable:
<script>
  window.MIURI = null;
</script>

Que la modificaremos antes de arrancar la aplicación (un script con sed por ejemplo).

Luego usaremos la variable window.SERVER_DATA en nuestra app.
Cuidado si ese valor que ponemos puede ser modificado por el usuario. Peligro de vulnerabilidad XSS
https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0


Para que se modifique la variable antes del arranque usando containers de docker
ENV FOO null
CMD sed -i "s#window.MIURI=null#window.MIURI=${FOO}#" build/index.html && serve -s build

docker run -e FOO='valor' ...

