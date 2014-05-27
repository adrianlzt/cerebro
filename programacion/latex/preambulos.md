Tras \documentclass

\usepackage{lmodern}
\usepackage[T1]{fontenc}
\usepackage[spanish,activeacute]{babel}
\usepackage{mathtools}

\title{Ejemplo de \LaTeX{}}
\author{Juan Antonio Navarro P\'erez}
\date{29 de enero de 2010}


Los dos primeros paquetes, lmodern y fontenc, se utilizan para mejorar el soporte de caracteres especiales en la fuente (tipo de letra) que se usará en tu documento. Por ejemplo para que puedas copiar y pegar texto correctamente desde el documento PDF que produzcas al final.

El siguiente paquete incluido es babel con la opción spanish que traduce algunas de las etiquetas usadas por LaTeX, y agrega opciones especiales para redactar documentos en español. Si no incluyes este paquete, o cambias spanish por english, LaTeX supondrá que estás escribiendo en inglés.

El último paquete incluido es mathtools que agrega algunos comandos y funciones especiales para facilitar la escritura de fórmulas y ecuaciones matemáticas.

Hay muchos otros paquetes que puedes incluir y que agregan funciones adicionales a tu documento, pero estos son los básicos que siempre es una buena idea incluir. Algunos otros paquetes típicos son hyperref, que te permite incluir ligas en tu documento, biblatex, para administrar tu bibliografía, o tikz, para crear todo tipo de ilustraciones.

Finalmente los campos \title, \author y \date especifican los datos que irán en el encabezado del documento. Normalmente, de hecho, no es necesario incluir el comando \date pues LaTeX usará en su lugar la fecha actual cuando generes tu documento.
