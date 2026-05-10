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

# TUI

Parece que lo moderno es usar la tui en vez de "hermes".
```bash
hermes --tui
```

También está la CLI, pero parece menos potente
```bash
hermes
```

Parece que se parece a como uso `opencode`.
También tiene restore de sesión:
```bash
hermes --resume 20260510_172715_f0cf69
hermes -c "Queuing Hello World Tasks in Hermes Kanban"
```

## Nueva sesión

```
/reset
/new
```

## Mostrar pensamiento
```
/reasoning show
/reasoning hide
```

O en la config:
```yaml
display:
  streaming: true         # Stream tokens to terminal in real-time
  show_reasoning: true    # Show model reasoning/thinking above each response
```

# Kanban

Para tener un tablero tipo kanban donde crear tareas, agentes las ejecutan, etc.

Database con los datos:
```
/home/adrian/.hermes/kanban.db
```

Parece que tenemos que tener asignados a las tareas y cada asignado debe tener su profile creado.

Para crear un profile partiendo del default (llm model, provider, etc):
```bash
hermes profile create backend-agent --clone
```
