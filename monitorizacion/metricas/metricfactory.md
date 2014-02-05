https://github.com/smetj/metricfactory

Convertir unos tipos de métricas en otros.
Ej.: mod_gearman (nagios perfdata) -> graphite
http://smetj.net/submit-nagios-metrics-to-graphite-with-modgearman-and-metricfactory-revisited.html

Metricfactory makes use of Wishbone to build an pipeline of modules through which events travel and change. The setup of the Metricfactory server is described in a bootstrapfile. A bootstrap file contains which modules to initialize and which path data has to follow througout these modules.

The idea behind a MetricFactory server is that it accepts metrics, converts them into a common format, which on its turn can be processed and/or converted again into another format.

## Formatos ##
builtin:
  logging  | loglevelfilter    | Filters Wishbone log events.                           
           | humanlogformatter | Formats Wishbone log events.                           
           |                   |                                                        
  metrics  | graphite          | Converts the internal metric format to Graphite format.
           |                   |                                                        
  flow     | roundrobin        | Round-robins incoming events to all connected queues.  
           | fanout            | Duplicates incoming events to all connected queues.    
           | tippingbucket     | Event buffer module.                                   
           | funnel            | Merges incoming events from multiple queues to 1 queue.
           | lockbuffer        | A module with a fixed size inbox queue.                
           |                   |                                                        
  function | header            | Adds information to event headers.                     
           |                   |                                                        
  input    | testevent         | Generates a test event at the chosen interval.         
           |                   |                                                        
  output   | syslog            | Writes log events to syslog.                           
           | null              | Purges incoming events..                               
           | stdout            | Prints incoming events to STDOUT.                      
           | slow              | Processes an incoming event per X seconds.

Wishbone modules (extras)
input:
  dictgenerator
  gearman
  generator
  httprequest
  namedpipe
  tcp
  udp
  uds

function:
  json
  msgpack
  skeleton
  snappy

output:
  amqp
  elasticsearch
  email
  mongodb
  mqtt
  tcp
  udp
  uds


## Instalar ##
Podemos generar rpm para los paquetes wb_input_gearmand y wb_output_tcp con fpm.

Previamente necesitaremos (para el nodo donde se instalaran los rpm):
  package { ['libyaml-devel','python-pip'] :
    ensure => installed,
  }
  ->
  package { ['metricfactory','pycrypto','gearman','wishbone'] :
    ensure => installed,
    provider => pip,
  }

Para generar los rpm:
  yum install -y git rpm-build
  git clone https://github.com/smetj/wishboneModules.git
  cd wishboneModules/
  fpm -s python -t rpm --no-depends wb_input_gearman/setup.py
  fpm -s python -t rpm --no-depends wb_output_tcp/setup.py



## Configuración ##

Podemos usar 
  routingtable:
    - gearmand.outbox   -> stdout.inbox
para comprobar que estamos obteniendo lo que necesitamos.

# Multiinstancia
--instances x, arranca 5 procesos hijos colgando de uno padre


# Gearman
Workers, número de hilos que procesarán la información de la cola. Si vemos que consume mucha CPU puede ser por culpa de la encriptación, pensar en quitarla si ocurriese esto.
