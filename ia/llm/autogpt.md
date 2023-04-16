https://github.com/Significant-Gravitas/Auto-GPT

Usar GPT4 para generarse instrucciones a si mismo.

Herramientas disponibles:
 - web search (google)
 - browse_website (navegar webs usando selenium, que arranca el navegador que tengamos localmente)
 - memory (redis/pinecone/etc)
 - images (dalle/stable-diffusion)
 - local commands
 - text-to-speech (OSX/Brian/ElevenLabs)

Usa OpenAI text-embedding-ada-002 para hacer los embeddings.

Cuando arrancamos, al pasarle el nombre de la IA, su rol y los goals, lo almacena en ai_settings.yaml

# Ejecutar
git clone ...
cd ...
pipenv shell
pipenv install
python -m autogpt


python -m autogpt --help
