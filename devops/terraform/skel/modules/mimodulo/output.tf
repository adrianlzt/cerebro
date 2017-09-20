# Son los parametros de salida del modulo
output "ip" {
  value       = "${aws_eip.ip.public_ip}"
  description = "explicar que es esto"
}
