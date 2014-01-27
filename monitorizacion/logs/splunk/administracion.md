/srv/splunk/etc/system/local/props.conf
http://docs.splunk.com/Documentation/Splunk/6.0.1/admin/Propsconf
En $SPLUNK_HOME/etc/system/default/props.conf hay un fichero de ejemplo.


## No indexar ciertos elementos ##
Ejemplo, solo indexamos los eventos con la cadena 'login'

props.conf
  [source::/var/log/foo]
  # Transforms must be applied in this order
  # to make sure events are dropped on the
  # floor prior to making their way to the
  # index processor
  TRANSFORMS-set= setnull,setparsing
  # Para descartar todo simplemente pondriamos = setnull

transforms.conf
  [setnull]
  REGEX = .
  DEST_KEY = queue
  FORMAT = nullQueue
  
  [setparsing]
  REGEX = login
  DEST_KEY = queue
  FORMAT = indexQueue
