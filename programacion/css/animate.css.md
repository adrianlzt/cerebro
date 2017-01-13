https://daneden.github.io/animate.css/
https://github.com/daneden/animate.css

Efectos de movimiento con css. Bounce, flash, pulse, etc


# Instalacion

## Manual
wget https://raw.github.com/daneden/animate.css/master/animate.css

<head>
  <link rel="stylesheet" href="animate.min.css">
</head


# npm/bower
$ npm install animate.css --save
$ bower install animate.css --save

<link rel="stylesheet" href="animate.min.css">


## CDN:
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
</head>




# Uso
<h1 class="animated infinite bounce">Example</h1>

infinite hace que el efecto se produzca sin parar


## jQuery
$('#yourElement').addClass('animated bounceOutLeft');
$('#yourElement').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething);

