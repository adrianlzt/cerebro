mirar pm.md


Poner en modo avion
  el icono de activa, pero no veo que afecte a nada

Quitar datos moviles
settings put global mobile_data 0
  se quita el icono de "H+" pero no veo que deje de tener datos


Poner modo avion:
settings put global airplane_mode_on 1
am broadcast -a android.intent.action.AIRPLANE_MODE --ez state 1

Quitar modo avión:
settings put global airplane_mode_on 0
am broadcast -a android.intent.action.AIRPLANE_MODE --ez state 0

