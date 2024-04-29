https://www.uninformativ.de/blog/postings/2017-04-02/0/POSTING-en.html

En X11 hay dos tipos de "clipboards" (selections se llaman).
Uno es donde se copia el texto seleccionado con el ratón, y otro es donde se copia el texto cuando hacemos control+c.

En ambos casos el sistema funciona de la misma manera.
La aplicación que usa un selection simplemente avisa al servidor X11 que tiene un selection.
Cuando otra aplicación quiere acceder (al hacer click al medio o al hacer control+v), esa aplicación le solicita el valor a la aplicación que tenga la selection.

También existe un tema de tipos de datos (mime types).
Entre las aplicaciones se gestiona el tipo de datos que será copiado y pegado.

Por ejemplo, un texto de una página web se puede "mover" como texto plano o como HTML.
