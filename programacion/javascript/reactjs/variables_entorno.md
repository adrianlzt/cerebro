https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

The environment variables are embedded during the build time. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime


Otra opción es cargar en el index.html una variable:
<script>
  window.SERVER_DATA = __SERVER_DATA__;
</script>

Que la modificaremos antes de arrancar la aplicación (un script con sed por ejemplo).

Luego usaremos la variable window.SERVER_DATA en nuestra app.
