https://github.com/yudai/gotty

Nos permite crear un servidor web a partir de cualquier aplicación de consola.
Por ejemplo:
gotty top
  crea un server web que muestra la información que saca "top"

gotty -w tmux a
  crea un server web donde la gente puede conectar y escribir en el navegador
  nos puede servir para compartir una sesión de tmux y que varios escriban al mismo tiempo (un poco como tmate)


Configuraciones posibles (~/.gotty)
https://github.com/yudai/gotty/blob/master/.gotty

Poner fondo blanco/gris y letras negras:
preferences {
  foreground_color = "rgb(16, 16, 16)"
  background_color = "rgb(240, 240, 240)"
  cursor_color = "rgba(255, 0, 0, 0.5)"
}
term = "hterm"
