object ServiceGroup "ping" {
  display_name = "Ping Checks"

  assign where match("ping*", service.name)
}

object ServiceGroup "http" {
  display_name = "HTTP Checks"

  assign where match("http_*", service.check_command)
}

object ServiceGroup "disk" {
  display_name = "Disk Checks"

  assign where service.check_command == "disk"
}

