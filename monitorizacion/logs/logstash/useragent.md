En un filtro anterior habremos sacado la variable "agent" a partir de una traza.
Este filtro sabrá interpretar esa cadena de texto y decirnos el navegador, versión, sistema operativo, etc

filter {
  ...
  
  useragent {
    source => "agent"
    target => "useragent"
  }
}
