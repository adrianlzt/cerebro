Nuestro error solo tiene que cumplir una intefaz:

type error interface {
    Error() string
}

Podemos definirlo de cualquier manera con total que tengamos esa interfaz para sacar el texto
