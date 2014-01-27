> x = 1:100
> e = sample(seq(-9,9,0.3),100,replace=TRUE)
> y <- x+e
> e = sample(seq(0,9,0.3),20,replace=TRUE)
> y[20:39] <- y[20:39]+e
> y[20:39] <- y[20:39]+e
> plot(x,y)
> cor.test(x,y)

        Pearson's product-moment correlation

data:  x and y
t = 42.2706, df = 98, p-value < 2.2e-16
alternative hypothesis: true correlation is not equal to 0
95 percent confidence interval:
 0.9610279 0.9822288
sample estimates:
      cor
0.9736556


The key result we're interested in is the "p-value". Conventionally, any correlation with a p-value less than 0.05 is considered statistically significant

He hecho pruebas metiendo valores aleatorios más exagerados, y la verdad es que para valores de p ~0.05 a ojo no se observa correlacción.


Linea que representa la correlacción de los datos:
> linea <- lm(y ~ x)
> plot(x,y)
> abline(linea)

