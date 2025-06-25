<https://github.com/elastic/llm-debug-proxy>

Proxy designed for debugging LLM requests.

Levanta un servidor escuchando en el puerto 3000.
Saca por la terminal las llamadas y respuestas.

He hecho un fork para poder ejecutarlo con npx y arreglar un bug para cuando no hay tools.

Para ejecutarlo:

```bash
npx -y github:datadope-io/llm-debug-proxy
```

Podemos usarlo con la típica variable de entorno de OPENAI:

```bash
OPENAI_API_BASE="http://localhost:3000?target_url=http%3A%2F%2Flitellm%2Efoo%2Ecom%3A4000"
```

O con curl sería:

```bash
curl "http://localhost:3000?target_url=http%3A%2F%2Flitellm%2Efoo%2Ecom%3A4000%2Fv1%2Fresponses" -H "Content-Type: application/json" -H "Authorization: Bearer REDACTED" -d '{
        "model": "gpt-4.1-nano",
        "input": "Write a one-sentence bedtime story about a unicorn."
    }'
```
