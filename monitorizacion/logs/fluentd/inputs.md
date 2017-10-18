https://docs.fluentd.org/v0.12/articles/input-plugin-overview

# tail
https://docs.fluentd.org/v0.12/articles/in_tail

<source>
  @type tail
  path /var/log/httpd-access.log
  tag fichero
  format none     # mirar parsers.md
</source>
