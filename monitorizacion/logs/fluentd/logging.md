<system>
  log_level warn
</system>


Tambien se puede especificar por plugin:
https://docs.fluentd.org/v0.12/articles/logging#per-plugin-log
<source>
  @type tail
  @log_level debug

