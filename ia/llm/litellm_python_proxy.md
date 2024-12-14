<https://docs.litellm.ai/>

Python SDK, Proxy Server (LLM Gateway) to call 100+ LLM APIs in OpenAI format - [Bedrock, Azure, OpenAI, VertexAI, Cohere, Anthropic, Sagemaker, HuggingFace, Replicate, Groq]

Call all LLM APIs using the OpenAI format [Bedrock, Huggingface, VertexAI, TogetherAI, Azure, OpenAI, Groq etc.]

Para ver obtener info de los distintos modelos (max input/output tokens, coste, etc): <https://models.litellm.ai/>

Podemos usarlo como python sdk o como proxy.

Como proxy nos puede levantar una admin UI para gestionar equipos, usuarios, budgets, etc.

Tenemos que pasarle un fichero de configuración con los modelos soportados.

<https://docs.litellm.ai/docs/proxy/configs>

```bash
litellm --config model.yaml
```

Si queremos ver las peticiones recibidas y como se envían upstream, añadir:

```
--detailed_debug
```

Para consultar los modelos configurados:

```bash
curl  http://localhost:4000/v1/models | jq
```
