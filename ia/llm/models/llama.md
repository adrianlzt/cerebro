LLaMa es un LLM creado por facebook
https://github.com/facebookresearch/llama/
Los weights en principio solo se liberaban bajo petición, a equipos de investigación, etc.
El código si es público.

Para ejecutar llama de manera fácil?
https://ollama.ai/

Llamafile, ficheros ejecutables que levantan una pequeña interfaz web. Hay diferentes modelos OSS
https://github.com/Mozilla-Ocho/llamafile


Llama2:
https://huggingface.co/models?sort=trending&search=thebloke%2FLlama-2

Pero están en torrent:
https://github.com/juncongmoo/pyllama#-download-model-files
https://github.com/facebookresearch/llama/pull/73/files


https://github.com/ggerganov/llama.cpp
Port of Facebook's LLaMA model in C/C++

Llama.cpp 30B runs with only 6GB of RAM now
https://github.com/ggerganov/llama.cpp/pull/613
https://news.ycombinator.com/item?id=35393284

# Tokens
Para contar tokens de Llama/Llama2
https://github.com/belladoreai/llama-tokenizer-js



# Alpaca
A team at Stanford gave LLaMA superpowers, by finetuning it on a synthetic instruction dataset into Stanford Alpaca to behave more like ChatGPT. They didn't release the weights either, but shared everything else needed to replicate it.

https://github.com/antimatter15/alpaca.cpp
llama.cpp + fine-tuning similar a lo que hizo Stanford para tener un LLM tipo chat.





https://github.com/lxe/simple-llama-finetuner
Simple LLM Finetuner is a beginner-friendly interface designed to facilitate fine-tuning various language models using LoRA method via the PEFT library on commodity NVIDIA GPUs


https://news.ycombinator.com/item?id=35107058&fbclid=IwAR3kdhbqOHfDezKZ_y-tUHGu-RcCzd_GEnmiiMQC6e2r57z78nyExNKI07M
LoRA is now supported by the State-of-the-art Parameter-Efficient Fine-Tuning (PEFT) library by HuggingFace.


The team behind Point Network replicated this experiment and released the weights publicly

https://twitter.com/PointNetwork/status/1636980445274406912?t=KAp5QJn905c8fd4LIv-wbw&s=08
