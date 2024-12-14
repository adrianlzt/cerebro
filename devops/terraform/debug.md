<https://www.terraform.io/docs/internals/debugging.html>

Niveles de log: TRACE, DEBUG, INFO, WARN or ERROR

TF_LOG=DEBUG terraform apply

Si queremos guardar el log en un fichero:
TF_LOG_PATH=/path/file ...

# Output

usar output {} para sacar variables y poder tracear como se van formando.
Recordar que si el value es vacio no mostrará nada

# terraform plan

Podemos generar un plan y almacenarlo para acceder a variables sensitivas

# capturar tráfico

Montar un MiTM (burpsuite por ejemplo).
Meto la CA a nivel de SO

Lanzar con:

```bash
HTTPS_PROXY=http://localhost:8080 terraform plan -out=PLAN
```
