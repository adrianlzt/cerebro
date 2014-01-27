## qplot ##
Gráficas más bonitas

weights <- c(300, 200, 100, 250, 150)
prices <- c(9000, 5000, 12000, 7500, 18000)
chests <- c('gold', 'silver', 'gems', 'gold', 'gems')
types <- factor(chests)
library(ggplot2)
qplot(weights, prices, color = types)
