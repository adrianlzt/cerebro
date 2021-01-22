Sensor muscular, para detectar la activación de los músculos.

Comprado sensor por 32€ en amazon: https://www.amazon.fr/gp/product/B088RBCLHN/ref=ppx_yo_dt_b_asin_title_o04_s01?ie=UTF8&psc=1

El microcontrolador viene montado sobre una placa con 6 conexiones:
V+, GND, V-: para conectarlo a -9, 0, +9v
Usando dos pilas de 9v, uniendo el + de una con el - de otra (ese será el punto GND)

Los otros dos pines (SIG, GND) son para medir voltaje. Podemos usar un multímetro, o típicamente conectarlo al ADC de un arduino/similar.
Conectado al flexor profundo de los dedos veo valores en reposo de ~100mV hasta 1.6V haciendo máxima fuerza
Para triceps supera los 3.0v

Los parches debemos conectarlos (se usa un minijack con tres cables):
  rojo (parte interior del minijack) a la mitad del cuerpo del músculo
  verde (mitad del minijack): final del cuerpo del músculo
  amarillo (punta del minijack): parte hueso o no muscular, cerca del músculo que queremos analizar


En este video muestran como se hace para el flexor profundo de los dedos:
https://www.youtube.com/watch?v=D-6GDlvAMCI&t=211s
