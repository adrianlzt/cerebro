http://cran.es.r-project.org/web/packages/treemap/index.html
install.packages("treemap")    Tarda bastante en compilarse, instalarse

library(treemap)
> nombres=c("pepe","juan","marco")
> pesos=c(20,80,180)
> dt = data.frame(nombres,pesos)
> treemap(dt,index="nombres",vSize="pesos")

> apellidos=c("lopez","lopez","perez")
> dt = data.frame(nombres,pesos,apellidos)
> itreemap(dt,index="nombres",vSize="pesos")
Este levanta un server en el puerto :8000 y me abre el navegador.
Me deja jugar con los distintos índices, etc
