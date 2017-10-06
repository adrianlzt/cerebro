https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html

Existen 4 lenguajes distintos para escribir los scripts, siendo el de por defecto "painless".
También se pueden usar groovy (built-in), javascript (mediante el plugin lang-javascript) y python (mediante plugin lang-python).

También existen otros lenguajes para tareas más específicas:
expression, fast custom ranking and sorting.
mustache, templates.
java, para crear tus propios plugins.


Excepto painless, expression y mustache, el resto corren sin estar sandboxed, esto puede suponer un problema de seguridad.
https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-security.html


# Uso
Esquema general:
  "script": {
    "lang":   "...",  
    "source" | "id" | "file": "...", 
    "params": { ... } 
  }

Los scripts no sandboxed solo se pueden usar dejando un fichero con dicho script en todos los nodos del cluster
