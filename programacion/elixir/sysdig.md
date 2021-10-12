Pillar todos los procesos (tal vez falten algunos según que arranque?)
sudo sysdig "(proc.name=elixir or proc.name=epmd or proc.name=beam.smp or proc.name=erl_child_setup or proc.name=inet_gethost)"

Parece que la mayoría de cosas las hace beam.smp
