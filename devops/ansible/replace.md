replace: dest=hiera.yaml regexp="^(\s+[:]+pass[:]+ )monitoring$" replace="\1auto@monitoringPSQL"

  :pass:  monitoring
  ->
  :pass:  auto@monitoringPSQL
