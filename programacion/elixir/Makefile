#
# Example Makefile for a elixir project. Probably not complete and not tested
#
# Need deps (and ecto for migrations):
# defp deps do
#   [
#     {:credo, "~> 1.5", only: [:dev, :test], runtime: false},
#     {:dialyxir, "~> 1.0", only: [:dev], runtime: false},
#     {:excoveralls, "~> 0.10", only: :test},
#   ]
# end
#
.PHONY: all clean clean deps compile plt dialyzer credo test migrate rollback run daemon live docs

all: deps compile plt dialyzer

clean:
	@mix deps.clean --all

deps:
	@mix deps.get

compile:
	@mix compile

plt:
	@mix dialyzer --plt

dialyzer:
	@mix dialyzer

credo:
	@mix credo

test:
	mix coveralls.html

migrate:
	@mix ecto.migrate

rollback:
	@mix ecto.rollback

run:
	@iex -S mix phx.server

daemon:
	@iex -S mix phx.server

live:
	@iex -S mix phx.server

docs:
	@mix docs


# vim:ft=make
#
