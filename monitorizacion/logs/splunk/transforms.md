SPLUNK Education - Administering.pdf - p.45

Estas transformaciones se invocan desde el propx.conf
  Ejemplo:
  [syslog]
  TANSFORMS = syslog-host

  transforms.conf
  [syslog-host]
  DEST_KEY = MetaData:Host
  REGEX = ...
  FORMAT = host::$1
