Como se entrena un LLM
https://huggingface.co/blog/how-to-train

https://inv.vern.cc/watch?v=kCc8FmEb1nY / https://www.youtube.com/watch?v=kCc8FmEb1nY
Let's build GPT: from scratch, in code, spelled out

1. obtener un dataset, texto del idioma/s que queramos entrenar.
2. Entrenar un tokenizador (vocabulario más como partir el texto? no lo tengo claro)
3. Entrenar el modelo, que aprenda, dados unos tokens, que probabilidad tienen el resto de aparecer.
4. Fine-tunning con etiquetado gramatical (Part-of-speech tagging / POS)
   Se trata de enseñar al modelo que es un nombre, verbo, pronombre, etc
   También parece que se podría hacer fine-tunning para saber extraer localizaciónes, nombres, etc (https://huggingface.co/datasets/wikiann)


Para como entrenar un "InstructGPT" (algo tipo ChatGPT):
https://openai.com/research/instruction-following
https://arxiv.org/abs/2203.02155
GPT puede no entender que debe "responder" a lo que escribimos, tal vez simplemente completa con frases parecidas a lo que hayamos puesto.
Con InstructGPT se asume que le estamos enviando una orden y debe contestar.

https://huggingface.co/blog/stackllama#:~:text=From%20InstructGPT%20paper%3A%20Ouyang%2C%20Long%2C%20et%20al
Parece que se hace primero un fine-tunning manual, con humanos generando respuestas a distintos prompts.
Esto parece que alinea al modelo para que se centre en contestar lo que se le pregunta, para que sea "orientado a chat" y sigua instrucciones.

En este punto entra Reinforcement Learning from Human Feedback (RLHF)
https://huggingface.co/blog/rlhf
Se entrena un reward model (RM) a base de que humanos categoricen distintas respuestas generadas por el modelo ya fine-tunned.
La idea es que para un mismo prompt, se pide al modelo que genere, por ejemplo, 4 respuestas y un humano las categoriza de mejor a peor.

Por último, se usa ese RM para entrenar al modelo. Por cada prompt que se le pasa le devuelve un score.
De esta manera va mejorando sus respuestas.

Ejemplo de como usar fine-tunning + RLHF para entrenar LLaMa.
https://huggingface.co/blog/stackllama

En datasets.md hay ejemplos de un dataset de instrucciones para entrenar un LLM instruction-tuned.


# Ejemplo entrenando LLaMa con un chat de amigos
https://www.izzy.co/blogs/robo-boys.html
https://news.ycombinator.com/item?id=35540154
