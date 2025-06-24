<https://dspy.ai/>
[Explicación de uno de los developers](https://x.com/lateinteraction/status/1921565300690149759?t=gO4O2Ty_D6yVv90E-usxtw&s=19)
[Video donde lo explican](https://www.youtube.com/watch?v=JEMYuzrKLUw&t=941s)
Este [video](https://www.youtube.com/watch?v=Dt3H2ninoeY) me parece una mejor, y más pausada, explicación.

DSPy is a declarative framework for building modular AI software. It allows you to iterate fast on structured code, rather than brittle strings, and offers algorithms that compile AI programs into effective prompts and weights for your language models, whether you're building simple classifiers, sophisticated RAG pipelines, or Agent loops.

Think of DSPy as a higher-level language for AI programming (lecture), like the shift from assembly to C or pointer arithmetic to SQL.

Parece que la idea es decir lo que quieres hacer con el LM, en vez de tener que crear prompts haciendo copy&paste de templates.
Por ejemplo: quiero hacer CoT con RAG, y DSPy genera el prompt para conseguir eso.

Nos evita tener que crear prompts de manera manual, y nos abstrae de las técnicas de prompting.

La documentación no es muy buena. Por ejemplo, para saber como usar el LabeledFewShot hay un ejemplo con 3 líneas donde no explica que hay que hacer, el objetivo, etc.

# Conceptos

## Signatures

Decidimos que queremos que haga el LM, expresadas como "firmas" de funciones.
Ejemplos:

```
question -> answer: float
long_document -> summary
context, question -> rationale, response
```

Si no especificamos el tipo de dato se considera que es `str`.

## Modules

Son las distintas técnicas que existen para hacer prompting (CoT, ReAct, etc), empaquetadas de manera que las podamos usar sencillamente.
A estos módulos le pasaremos una signature.

Nos abstraen de las técnicas de prompting. Para nosotros es solo una capa que usamos.

Estos modules serán funciones que podremos llamar.

## Optimizers

**NOTA**: cuidado con las optimizaciones, pueden realizar muchas llamadas al LM y ser costosas.

Es la forma automática de hacer prompt engineering.
Como mejorar esos prompts para mejorar una métrica que hayamos definido.

Estos optimizadores "compilan" los módulos+signatures para nuestro caso de uso.
Buscan el mejor prompt para nuestra pipeline.
Generan el entregable que usaremos.

Para generar una optimización tenemos que pasar unos ejemplos con el resultado esperado.

Ejemplo de código (`CoT` es nuestro módulo generado antes):

```python
examples [dspy.Example(question='Which award did the first book of Gary Zukav', answer='The Dancing Wu Li Masters'),
teleprompter dspy.BootstrapFewShot(metric=dspy.evaluate.answer_exact_match)
bootstrapped_program teleprompter.compile(CoT, trainset=examples)
```

When you build a dspy.Example, you should generally specify .with_inputs("field1", "field2", ...) to indicate which fields are inputs. The other fields are treated as labels or metadata.

Cuando juntamos varios módulos, al optimizador solo le estamos dando ejemplos de inputs y output esperado, pero nada de los resultados intermedios.
Los optimizadores BootstrapFewShot usarán el LM para auto generar trazas intermedias que le puedan servir de ejemplos.

Los optimizadores pueden usar distintas técnicas:

- encontrar que few shots funcionan mejor
- encontrar mejores formas de describir lo que necesitamos
- generar datasets para hacer fine-tunning del LM

<https://dspy.ai/tutorials/rag/?h=with_inputs#:~:text=Training%20(and%20with%20it%20Validation)%20set%3A>

- Optimizers typically learn directly from the training examples and check their progress using the validation examples.
- It's good to have 30--300 examples for training and validation each.
- For prompt optimizers in particular, it's often better to pass more validation than training.

Podemos tener también un dataset "dev" pequeño para ir paso a paso viendo que hace.
También un dataset "test" que usaremos al final para ver la calidad del programa.

### LabeledFewShot

Añadir unos few shots a partir de una lista de Examples generada por nosotros.

Ejemplo de uso:
<https://gist.github.com/adrianlzt/5623709cd64c3a2e2b2d2ee2688ced8e>

### MIPROv2

<https://dspy.ai/api/optimizers/MIPROv2/>

Mejora el prompt probando distintos few shots, leyendo nuestro código (para conocer nuestro objetivo) para generar mejores instruciones, buscando la mejor combinación de few shots e instrucciones.

## Adapters

Tradcucen módulos en basic prompts.

# Configurar LM / models

<https://dspy.ai/learn/programming/language_models>

```python
llm = dspy.LM("github/microsoft/Phi-4",api_base="https://models.github.ai/inference",api_key="github_pat_XXX")
llm("say hello")
```

## Cache

Por defecto está activado el "cache", que recodará las llamadas a los modelos para evitar reahacerlas si son iguales.
<https://dspy.ai/api/models/LM/?h=cache#dspy.LM:~:text=4000-,cache,-bool>

Almacena por defecto en `~/.dspy_cache`.

# Como funciona

Definimos como debe "pensar" y que debe devolver.
DSPy genera un prompt para el modelo de lenguaje.
Cuando queremos ejecutarlo, DSPy pasa nuestro "input" con ese template del prompt al LM.

Ejemplo:

```python
math = dspy.ChainOfThought("question -> answer: float")
math(question="Two dice are tossed. What is the probability that the sum equals two?")
```

Intercambio de mensajes:

```
System message:

Your input fields are:
1. `question` (str)
Your output fields are:
1. `reasoning` (str)
2. `answer` (float)
All interactions will be structured in the following way, with the appropriate values filled in.

[[ ## question ## ]]
{question}

[[ ## reasoning ## ]]
{reasoning}

[[ ## answer ## ]]
{answer}        # note: the value you produce must be a single float value

[[ ## completed ## ]]
In adhering to this structure, your objective is:
        Given the fields `question`, produce the fields `answer`.


User message:

[[ ## question ## ]]
Two dice are tossed. What is the probability that the sum equals two?

Respond with the corresponding output fields, starting with the field `[[ ## reasoning ## ]]`, then `[[ ## answer ## ]]` (must be formatted as a valid Pythonfloat), and then ending with the marker for `[[ ## completed ## ]]`.


Response:

[[ ## reasoning ## ]]
When two fair dice are tossed, there are 6 possible outcomes for the first die and 6 possible outcomes for the second die. The total number of possible outcomes is the product of the outcomes for each die, which is 6 * 6 = 36.
We are looking for the probability that the sum of the two dice equals two. The only way to get a sum of two is if both dice land on 1. This corresponds to the outcome (1, 1).
There is only 1 favorable outcome (1, 1).
The probability is the number of favorable outcomes divided by the total number of possible outcomes.
Probability = (Number of outcomes where the sum is 2) / (Total number of possible outcomes)
Probability = 1 / 36

To express this as a float, we calculate 1 divided by 36.
1 / 36 ≈ 0.02777777...

[[ ## answer ## ]]
0.02777777777777778

[[ ## completed ## ]]
```

# Tracing / debug / observability

<https://dspy.ai/tutorials/observability/>

## MLFlow

Para loguear a MLflow Tracing

```python
mlflow.dspy.autolog()
```

Por defecto almacenará los resultados en ficheros locales que podemos consultar con:

```
mlflow ui
```

Si queremos usar un server remoto hace falta especificar el server de mlflow, con la variable de entorno:

```bash
MLFLOW_TRACKING_URI=http://localhost:5000
```

O en código:

```python
mlflow.set_tracking_uri("http://localhost:5000")
```

## Peticiones

Para ver las n últimas peticiones:

```python
dspy.inspect_history(n)
```

## Logging

Si queremos sacar trazas, también mostrando lo que genera litellm:

```python
import logging

logging.basicConfig(level=logging.DEBUG)
```

# Dudas

El formato de la signature, nos lo podemos inventar?
Podemos pasar los parámetros que nos de la gana de entrada y de salida?
Solo hay que respetar:
XXX -> YYY?
Parece que si, que esto no sigue un formato concreto.
