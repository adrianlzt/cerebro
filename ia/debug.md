# Posibles técnicas para mejorar un algoritmo
- Obtener más training examples
- Probar con más/menos features
- Añadir polynomial features (para el caso de linear regression)
- Incrementar/decrementar λ (learning rate)


# Evaluar una hipótesis
Separar nuestro dataset en 70/30% (training set / test set).
Debemos escoger estos grupos de forma aleatoria, para evitar que haya alguna feature escondida en el ordenamiento

Entrenaremos nuestro sisema con el training set y luego calcularemos el error sobre el test set.
La idea es que obtengamos bajos valores en ambos sets.
