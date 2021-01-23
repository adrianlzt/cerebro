Nos abre una ventana con la gráfica


# Histograma
hist(randn(1,50))


# Colormap
Útil para pintar una matriz donde la escala de grises denota el valor
imagesc(magic(5)), colorbar, colormap gray;

# gráfica
x=[0:0.01:0.98];
y=sin(2*pi*4*x);
plot(x,y)


Si queremos pintar varias, le diremos que no cierre la gráfica anterior antes de pintar la nueva con:
hold on;

Otra opción es decirle que queremos las gráficas en diferentes ventanas:
figure(1); plot(x,y)

O podemos dividir la pantalla en varias gráficas:
subplot(1,2,1); % dividir la pantalla para tener 1 row con 2 columas de gráficas, y elige la primera
plot(x,y)
subplot(1,2,1); % ahora elegimos la segunda
plot(x,y2)

Para limpiar el subplot:
clf

## Color
plot(x,y, 'r')
  pintar en rojo
por defecto azul

## scatter, forma, para pintar puntos en vez de una línea
'o' son círculos
'x' son aspas

A las gráficas donde solo tenemos puntos les llaman "scatter plots"
Podemos pintarlo también como:
scatter(1:0.1:5, 1:0.1:5)

Truco para pintar un scatter de una logistic regression:
pos = find(y==1);
neg = find(y == 0);
plot(X(pos, 1), X(pos, 2), 'k+','LineWidth', 2, 'MarkerSize', 7);
plot(X(neg, 1), X(neg, 2), 'ko', 'MarkerFaceColor', 'y', 'MarkerSize', 7);
  lo que hacemos es quedarnos con los rows de X que tengan un '0' o '1' en su correspondiente row de 'y'


## tamaño
plot(x,y,'o','MarkerSize',2)
tamaño de la marca = 10
por defecto parece que es 6

## Ejes
axis[(0.5 1 -1 1]) % [x_min x_max y_min y_max]
xlabel("test")
ylabel("foo")

## Leyenda
legend("sin", "cos")
  la primera palabra para el primer "plot" que hayamos hecho

## Título
title("bar")

## Exportar
print -dpng 'foo.png'


# isolineas / contour lines
Pintamos en 2d isolíneas, líneas que tienen el mismo valor de z.
Como el típico mapa topográfico con las líneas de nivel.

x=linspace(0,10,100); y=linspace(0,5,100); z=x'*y; contour(x,y,z,logspace(-2,3,20))

contour(x,y,z,[0,10,20,30,40,45])
  con el array del último parámetro le decimos que líneas queremos pintar (las líneas que tomen ese valor de z)



# 3d
https://octave.org/doc/v6.1.0/Three_002dDimensional-Plots.html#Three_002dDimensional-Plots

## mesh
ejeX = 1:3
ejeY = 1:6
[xx,yy] = meshgrid(ejeX, ejeY)

El comando meshgrid nos genera dos matrices de 6x3
La xx son 6 filas de los valores del ejeX
La yy son 3 columnas de los valores del eyeY

xx =
   1   2   3
   1   2   3
   1   2   3
   1   2   3
   1   2   3
   1   2   3

yy =
   1   1   1
   2   2   2
   3   3   3
   4   4   4
   5   5   5
   6   6   6

Con esto lo que conseguimos es tener todos los valores para el plano X,Y.
Ejemplo, para x=1, tenemos los valores y=1,2,3,4,5,6

Luego generaremos el valor z:
z = 4*xx + 6*yy;

Y pintando (pasando los ejes, no el meshgrid)
mesh (ejeX, ejeY, z);


## surface
Para unos ejes x=0:10 e y=0:5 pintamos z, que será el resultado de en cada punto multiplicar el valor de x por y

x=linspace(0,10,100); y=linspace(0,5,100); z=x'*y; surf(x,y,z)


## linea
plot3(1:0.1:4, 1:0.1:4, 1:0.1:4)


## scatter
Si queremos pintar una gráfica 3d con puntos asilados
scatter3(1:0.1:4, 1:0.1:4, 1:0.1:4)

Muy parecido a hacer (pero en este caso no nos pinta el "fondo" con las cuadrículas):
plot3(1:0.1:4, 1:0.1:4, 1:0.1:4, 'o')

