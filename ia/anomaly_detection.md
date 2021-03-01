Vamos a crear un módelo p(x) que nos de la probabilidad de tener una serie de features.
Si para p(x_test) < ε, lo marcaremos x_test como anómalo, ya que tiene una probabilidad muy baja de ocurrir.

El típico ejemplo es detección de fraude. Modelando la actividad de los usuarios, creando el modelo y luego viendo que usuarios tienen baja probabilidad.

También para monitorización de sistemas.
Recopilamos distintas features: uso cpu, uso cpu/network traffic, memoria, tráfico de red, iops disco

Lo que haremos es asumir que la distribución es normal (distribución de gauss) y buscar los parámetros μ y σ²

Para estimar μ haremos la media de los puntos:
μ = (1/m) ∑ᵢ₌₁,ₘ xⁱ

Para calcular la varianza:
σ² = (1/m) ∑ᵢ₌₁,ₘ (xⁱ - μ)²
  la podemos entender como la media de las distancias a μ
