https://itnext.io/enforcing-code-quality-in-elixir-20f87efc7e66

mirar credo y dialyzer

Credo is responsible for checking if the code is adherent to common good code practices established by the community. And dialyzer is a static analysis tool that identifies software discrepancies, such as definite type errors, code that has become dead or unreachable because of a programming error (paraphrasing the official docs), but we'll use dialyxir, which is wrapper around dialyzer written in Elixir that simplify the use of dialyzer.
