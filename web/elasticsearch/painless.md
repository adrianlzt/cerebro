https://www.elastic.co/guide/en/elasticsearch/painless/master/painless-api-reference.html

Painless lab en kibana, en developer tools.

Si queremos meter datos, meter en Parameters algo tipo:
{
  "ctx": {
    "payload": {
      "hits": {
        "hits": []
      }
    }
  }
}

Y para acceder a esos valores:
params.ctx.payload...


# Math
Para usar math de java tendremos que ponerlo primero:

Math.ceil(numero)


# Strings
Métodos disponibles
https://www.elastic.co/guide/en/elasticsearch/reference/5.4/painless-api-reference.html#painless-api-reference-String


Si queremos hacer un split haremos:

Visto en
https://www.elastic.co/guide/en/elasticsearch/reference/5.4/painless-api-reference.html#painless-api-reference-Pattern
https://github.com/elastic/elasticsearch/issues/26338


# Debug
Supuestamente con:
Debug.explain("a");

Pero en el painless lab no me funciona.
