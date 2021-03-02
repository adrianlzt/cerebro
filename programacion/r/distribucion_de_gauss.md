Si tenemos x ∈ ℝ. Si x está distribuída con media μ y varianza σ², lo escribimos como:

x ∼ N(μ, σ²)
 (∼ significa "distribuída como")
 (la N es una "N" especial que es la distribución normal)

σ: desviación estandar
σ²: varianza

Si graficamos esto tendremos la típica campana de gauss, centrada en μ y con una anchura σ.
Siendo "y" la probabilidad de ese valor.
El area de la superficie bajo la gráfica siempre será 1 (propiedad de las funciones de distribución).

La probabilidad para esta distribución:
p(x; μ,σ²) = (1/(√(2π)*σ)) exp(-(x-μ)²/(2σ²))


Si queremos aplicar lo anterior a un serie de features (x ∈ ℝⁿ), lo que haremos es multiplicar la p(x) de cada componente:
p(x) = p(x₁; μ₁,σ²₁)p(x₂;μ₂,σ²₂)...p(xₙ;μₙ,σ²ₙ) = ∏ⱼ₌₁,ₙ p(xⱼ; μⱼ,σ²ⱼ)



# Distribución gausiana multivariante
Otra opción si tenemos varias features es calcular p(x) una única vez.
Para ello haremos uso de los parámetros:
  - μ ∈ ℝⁿ
  - Σ ∈ ℝⁿˣⁿ  (matriz covariante)

p(x;μ,Σ) = (1/((2π)^(n/2)*|Σ|^(1/2))) exp((-1/2)(x-μ)ᵀΣ⁻¹(x-μ))

|Σ| es el determinante de la matriz Σ


Si reprentamos esta gausiana multivariante con 2D, tendremos un gráfico 3D donde la altura será el valor de p(x).
Si tenemos Σ igual a la matriz identidad multiplicada por una constante (es decir, los valores que no están en la diagonal son ceros, y en la diagonal tienen el mismo valor), tendremos una distribución con simetría axial
https://en.wikipedia.org/wiki/Multivariate_normal_distribution#/media/File:Multivariate_Gaussian.png

Valores más pequeños de 1 en la diagonal tendremos formas más estrechas.
Valores más grandes de 1, tendremos formas más anchas.

Si ahora mantenemos los valores fuera de la diagonal con cero, pero hacemos distintos los valores de la diagonal, rompemos la simetría axial, aunque mantenemos la simetría en el eje x₁ y x₂.
El parámetro [2,2] (suponiendo que los índices empiezan en 0), definirá la anchura en el eje x₂.
https://www.mathworks.com/help/examples/stats/win64/ComputeTheMultivariateNormalPdfExample_01.png

Hasta aquí (valores fuera de la diagonal son 0), los resultados de la multivariante o múltiples univariantes (p*p*p) son equivalentes.

Si variamos los valores fuera de la diagonal lo que haremos es girar la forma sobre el plano x₁,x₂
Valores de la no-diagonal positivos girarán hacia las aguas del reloj. Negativos al contrario.
Podemos jugar variando los valores en https://www.jgoertler.com/visual-exploration-gaussian-processes/
