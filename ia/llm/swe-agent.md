<https://github.com/SWE-agent/SWE-agent>
<https://swe-agent.com/latest/>

SWE-agent lets your language model of choice (e.g. GPT-4o or Claude Sonnet 3.5) autonomously use tools to:

- fix issues in real GitHub repositories,
- perform tasks on the web,
- crack cybersecurity challenges, or
- any custom task.

# Installation

<https://swe-agent.com/latest/installation/source/>

# Configuración

Usa litellm. Modelos: <https://docs.litellm.ai/docs/providers/openai#openai-chat-completion-models>

# Ejecución

Usa contenedores de docker para realizar la ejecución.

## Resolver una issue en un repositorio de GitHub

```bash
sweagent run \
  --agent.model.name=claude-3-5-sonnet-20241022 \
  --agent.model.per_instance_cost_limit=2.00 \
  --env.repo.github_url=https://github.com/SWE-agent/test-repo \
  --problem_statement.github_url=https://github.com/SWE-agent/test-repo/issues/1
```

Podemos pedirle que cree una pr:

```bash
--actions.open_pr
```

# Inspector

Para revisar que se ha hecho.

<https://swe-agent.com/latest/usage/inspector/#:~:text=or%20vim).-,Web%2Dbased%20inspector,-Run%20the%20inspector>

````

# Errores

Usando gemini me falla porque no encuentra la lib de python "google".
Posiblemente sea solucionable con una custom image: <https://swe-agent.com/latest/usage/cl_tutorial/#:~:text=for%20this%20one!-,%2D%2Denv.deployment.image,-points%20to%20the>

O con un post_startup_commands:
```bash
--env.post_startup_commands='["pip install flake8"]'
````
