# Pricing
https://beta.openai.com/pricing

Ada: $0.0008 / 1000 tokens
Davinci: $0.0600 / 1000 tokens

https://beta.openai.com/docs/engines/codex-series-private-beta

# Python
https://github.com/openai/openai-python

import openai
openai.api_key = "sk-..."
engines = openai.Engine.list()
print(engines.data[0].id)
completion = openai.Completion.create(engine="ada", prompt="Hello world")
print(completion.choices[0].text)
