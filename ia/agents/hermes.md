https://github.com/nousresearch/hermes-agent

# Install

```bash
paru -S hermes-agent
```

Para usar la tui he teniedo que hacer:
```bash
sudo chown -R $USER:$USER /opt/hermes-agent/venv/lib/python3.11/site-packages/ui-tui
```

Al final lo he instaldo con:
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Por que no veía el kanban en el dashboard y no se si era un fallo de la instalación o que.

```
Config:    /home/adrian/.hermes/config.yaml
API Keys:  /home/adrian/.hermes/.env
Data:      /home/adrian/.hermes/cron/, sessions/, logs/
Code:      /home/adrian/.hermes/hermes-agent

/home/adrian/.config/systemd/user/hermes-gateway.service
```

# Configuración

Elegir LLM provider:
```bash
hermes model
```
