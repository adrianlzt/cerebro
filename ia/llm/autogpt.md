https://github.com/Significant-Gravitas/Auto-GPT

Usar GPT4 para generarse instrucciones a si mismo.

Herramientas disponibles:
 - web search (google)
 - browse_website (navegar webs usando selenium, que arranca el navegador que tengamos localmente)
 - memory (redis/pinecone/etc), busqueda por proximidad de vectores, usando embeddings
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


# Precargar datos
https://github.com/Significant-Gravitas/Auto-GPT/issues/1671#issuecomment-1510223074

mv autogpt/data_ingestion.py .
mkdir auto_gpt_workspace/ingredients/
echo "data" > auto_gpt_workspace/ingredients/foo.txt
python data_ingestion.py --dir ingredients/

En redis tendremos el contenido y el embedding.
Hash:
  data: Filename: ingredients/foo.txt Content part#1/1: foo bar
  embedding: vector (np.array(query_embedding).astype(np.float32).tobytes())
