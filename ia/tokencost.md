<https://github.com/AgentOps-AI/tokencost/>
Contador de tokens para distintas plataformas.
Parece sobre todo orientado a gpt. Usa tiktoken por debajo.

Script de prueba para contar tokens en un directorio
<https://gist.github.com/adrianlzt/63d1cd7eb8f958e35fb104b78ebc1de0>

Para contar tokens de gemini: <https://medium.com/google-cloud/counting-gemini-text-tokens-locally-with-the-vertex-ai-sdk-78979fea6244>

```python
#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "google-cloud-aiplatform",
#   "sentencepiece",
# ]
# [tool.uv]
# exclude-newer = "2025-03-07T00:00:00Z"
# ///

import sys
from vertexai.preview.tokenization import get_tokenizer_for_model

model_name = "gemini-1.5-flash-002"
tokenizer = get_tokenizer_for_model(model_name)

contents = sys.stdin.read()
result = tokenizer.count_tokens(contents)

print(f"{result.total_tokens=:,}")
```

cat fichero | ./token_count.py
