Server un directorio, buscando el típico index.html
caddy file-server -l :8082

En Caddyfile
secrets.caddy.foo.co {
        root * /home/azureuser/secrets/
        file_server
}
