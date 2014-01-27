Rotado.
Se configura en  /opt/splunk/etc/log.cfg

appender.A4.fileName=${SPLUNK_HOME}/var/log/splunk/searchhistory.log
appender.A4.maxFileSize=25000000 # default: 25MB (specified in bytes).
appender.A4.maxBackupIndex=2
