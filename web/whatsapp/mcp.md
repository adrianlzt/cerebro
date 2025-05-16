<https://github.com/lharries/whatsapp-mcp>

WhatsApp MCP server

Al arrancar el whatsapp-bridge nos mostrará un código QR para escanear con el móvil. Una vez escaneado, el whatsapp-bridge se conectará a la cuenta de WhatsApp y descargará todos los mensajes en una sqlite.
Se levanta en el puerto 8080. Expone la api /api/send

El whatsapp-mcp se conecta con el whatsapp-bridge via API en el puerto 8080.
En twitter comentaban que hacer un wrapper python sobre una app go (la lib de whatsapp) era un poco raro.
