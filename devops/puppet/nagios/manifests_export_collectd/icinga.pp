node 'maquina.icinga.com' {
  Nagios_host <<| tag=="tidcampus" |>>
  Nagios_service <<| tag=="tidcampus" |>>
}
