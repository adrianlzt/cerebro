Memoria.

En un problema que tuvimos con jolokia+cliente jboss, había un memory leak que provocaba que el PS Old Gen se llenase al 100%.
En cambio el heap total se quedaba en torno al 85%.
Por lo tanto, parece mejor mirar cada una de las zonas de memoria a ver si se están llenando.
