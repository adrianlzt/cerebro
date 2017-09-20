# Son los parametros de entrada del modulo
variable "nombre_variable" {
  description = "Una pequeña descripción de que es esta variable"
  default     = "something"
}

# Comentario
variable "una_lista" {
  description = "una variable que es una lista"
  type        = "list"
  default     = ["0.0.0.0"]
}
