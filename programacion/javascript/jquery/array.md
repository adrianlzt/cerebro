Si un select nos da varios elementos podemos iterar por ellos como

variable[0]

Lo malo es que eso destruye el objecto jQuery.
Para mantenerlo lo hacemos como
variable.eq(0)
