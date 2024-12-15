Integraciones existentes:
<https://python.langchain.com/api_reference/google_genai/>

Uso básico (teniendo la variable de entorno OPENAI_API_KEY definida)

from langchain.llms import OpenAI
davinci = OpenAI(model_name='text-davinci-003')
davinci("cuanto son 2+2")
'\n\n2+2 = 4'

# Gemini

<https://pypi.org/project/langchain-google-genai/>

1.5 flash no tiene soporte para herramientas.
2.0 sí tiene soporte para herramientas.
