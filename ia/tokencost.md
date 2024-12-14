<https://github.com/AgentOps-AI/tokencost/>
Contador de tokens para distintas plataformas.
Parece sobre todo orientado a gpt. Usa tiktoken por debajo.

Script de prueba para contar tokens en un directorio
<https://gist.github.com/adrianlzt/63d1cd7eb8f958e35fb104b78ebc1de0>

Para contar tokens de gemini: <https://medium.com/google-cloud/counting-gemini-text-tokens-locally-with-the-vertex-ai-sdk-78979fea6244>

```python
from vertexai.preview import tokenization

model_name = "gemini-1.5-flash-001"
tokenizer = tokenization.get_tokenizer_for_model(model_name)

contents = "Hello World!"
result = tokenizer.count_tokens(contents)

print(f"{result.total_tokens = :,}")
```
