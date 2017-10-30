https://www.elastic.co/guide/en/logstash/current/plugins-filters-dissect.html

Sirve para dividir una linea de texto en sus distintas partes.
En vez de usar regexp, como grok, aqui únicamente tenemos en cuenta que separa las líneas para decidir que es cada campo.
Si las lineas son distintas entre si probablemente sea mejor grok.

Podemos aplicar varios dissection consecutivos. Primero extraemos el campo msg, luego troceamos msg en varias cosas.


Ejemplo:
2017/10/30 00:01:00 INFO : Called POST on https://api.coscale.com/api/v1/app/d19920de40a8/data/094/checkActions/, response code: 200, duration: 508ms

filter {
  dissect {
    mapping => {
      "message" => "%{ts} %{+ts} %{log_level} : Called %{verb} on %{url}, response code: %{resp_code}, duration: %{duration}"
    }
  }
}


{
  ...
  "log_level" => "INFO",
  "verb" => "POST",
  "url" => "https://api.coscale.com/api/v1/app/d19920de40a8/data/094/checkActions/",
  "duration" => "508ms",
  "resp_code" => "200",
  "ts" => "2017/10/30 00:01:00"
}



# Fields
%{normal}
%{}  no se almacena
%{?nada}  no se almacena
%{+some_field}  se hace append
%{+some_field/2}  se hace append en la segunda posición
%{?err} %{&err}, estos dos harán una entrada del diccionario, siendo el que tenga el "?" la clave y el "&" el valor.
