<https://vcrpy.readthedocs.io/en/latest/>

Para MCPs: <https://github.com/devhelmhq/mcp-recorder>

Para hacer tests que involucran llamadas HTTP. Esto las almacena y hace como un replay.

The first time you run code that is inside a VCR.py context manager or decorated function, VCR.py records all HTTP interactions that take place through the libraries it supports and serializes and writes them to a flat file (in yaml format by default). This flat file is called a cassette. When the relevant piece of code is executed again, VCR.py will read the serialized requests and responses from the aforementioned cassette file, and intercept any HTTP requests that it recognizes from the original test run and return the responses that corresponded to those requests. This means that the requests will not actually result in HTTP traffi
