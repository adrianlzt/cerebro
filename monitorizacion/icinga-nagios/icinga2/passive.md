Ya no hay freshness_threshold. Ahora se usa check_interval.

passive.conf
template Service "passive-service" {
  enable_active_checks = false
  check_interval = 5m
  check_command = "passive_not_received"
}

object CheckCommand "passive_not_received" {
  import "plugin-check-command"
  command = "echo \"CRITICAL - No data received in 5m\" && exit 1"
}
