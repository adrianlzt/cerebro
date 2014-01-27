> chests <- c('gold', 'silver', 'gems', 'gold', 'gems')
> types <- factor(chests)
> print(types)
[1] gold   silver gems   gold   gems  
Levels: gems gold silver

Ahora los valores de 'types' son punteros a que tipo de cosa son.
Los niveles son los tipos de cosas que pueden ser, y tiene valor de 1 a 3 en este caso
  gems = 1
  gold = 2
  silver = 3

Y podemos ver donde apuntan los 'types' convirtiendo el valor a integer.
> as.integer(types)
[1] 2 3 1 2 1

Si queremos obtener los "levels" (tipos)
levels(types)

Generar un nuevo factor con solo ciertos datos:
ac = ac[ac$var != 'valor']
ac = ac[c("col1","col4","col5")]

Contar rows:
nrow(var)

> chests <- c('gold', 'silver', 'gems', 'gold', 'gems')
> weights <- c(300, 200, 100, 250, 150)
> prices <- c(9000, 5000, 12000, 7500, 18000)
> plot(weights, prices, pch=as.integer(types))
> legend("topright", levels(types), pch=1:length(levels(types)))
Imprimimos una gráfica con peso en las abcisas y valor en las ordenadas, y asignamos un símbolo distinto para cada tipo de dato.
Por último ponemos una legenda para decir que es cada cosa.
