object CheckCommand "check-mk" {
  import "plugin-check-command"
  command = "python /var/lib/check_mk/precompiled/$host.name$"
}

