http://coffeescriptcookbook.com/chapters/syntax/for_loops

break y continue para parar y continuar en el siguiente bucle


Siendo json un array:
for x in json
  alert json[x].id


Iterar por un object
cosa = {}
cosa.age = 3
cosa.name = "pepe"
cosa.eur = 300

for k,v of cosa
  console.log "#{k}: #{v}"
