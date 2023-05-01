Es un poco como usar el "".format() de python, lo único que le podemos pasar ese prompt al chain run y pasarle en ese momento
el "relleno" para la template.

La mejora es: using Langchain’s PromptTemplate object, we can formalize the process, add multiple parameters, and build prompts with an object-oriented approach.



template = """Question: {question}

Answer: """

prompt = PromptTemplate(
        template=template,
    input_variables=['question']
)

llm_chain = LLMChain(
    prompt=prompt,
    llm=hub_llm
)

llm_chain.run(question)



Pasando la template renderizada directamente al modelo:
openai(prompt_template.format(query="Which libraries and model providers offer LLMs?"))



# FewShotPromptTemplate
https://www.pinecone.io/learn/langchain-prompt-templates/#:~:text=process%20with%20Langchain%E2%80%99s-,FewShotPromptTemplate,-%3A

Un helper para construir este tipo de prompts. Nada que no se pueda hacer con python "a pelo", pero parece que es útil para luego integrarlo en "chains".
Por ejemplo, podemos juntarlo con LengthBasedExampleSelector para elegir dinámicamente cuantos ejemplos queremos pasar, de manera que sepa cortar bien y no meter un ejemplo a medias.

Generamos una lista de preguntas/respuestas de como queremos el comportamiento, un prefijo para dar instrucciones y luego usamos FewShotPromptTemplate para que nos genere
el texto formateado de la manera esperada.


## LengthBasedExampleSelector
Nos permite definir los ejemplos y setear el máximo de palabras que se generarán.
Es un poco raro, porque el max_length definido en LengthBasedExampleSelector será el máximo global al generar el prompt.
Según el tamaño del prompt, se cogerán más o menos few-shots samples.
