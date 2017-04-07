#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""capacity_influxdb.py

Cliente para testear InfluxDB

Usage:
  capacity_influxdb.py [options] <command> [<args>...]

Commands:
  load_data                     Carga datos random
  simula_proyectos              Carga datos random

General options:
  -h --help                     show help message and exit
  -V --version                  show version and exit
  -v --verbose                  print status messages
  -d --debug                    print debug messages
  --influx_host <ifhost>        InfluxDB host [default: 127.0.0.1]
  --influx_port <ifport>        InfluxDB port [default: 8086]
  --influx_db <ifdb>            InfluxDB data base [default: test]
  --influx_user <ifuser>        InfluxDB user
  --influx_password <ifpass>    InfluxDB password
  --influx_timeout <iftimeout>  InfluxDB timeout
  --influx_batch <batch_size>   InfluxDB batch size writing points [default: 300]

See capacity_influxdb.py <command> --help for more information on a specific command.
"""

import sys
try:
    from docopt import docopt, DocoptExit, DocoptLanguageError
except ImportError:
    print "docopt module has to be installed"
    sys.exit(1)

from influxdb import InfluxDBClient
from datetime import datetime
from tqdm import tqdm
import random
import string

import logging

FORMAT = "[%(levelname)s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
logging.basicConfig(level=logging.ERROR, format=FORMAT)
logger = logging.getLogger(__name__)


__version__ = '0.1'
RETURN_CODE_ERROR = 1


################################################################################
class Client(object):
    """
    InfluxDB client to make testing
    """

    def __init__(self, args):
        logger.debug("Inicializar cliente InfluxDB.\n" \
                "Host: %s:%s/%s\n" \
                "User: %s\n" \
                "Pass: %s\n" \
                "Timeout: %s\n" % (args['--influx_host'],
                    args['--influx_port'],
                    args['--influx_db'],
                    args['--influx_user'],
                    args['--influx_password'],
                    args['--influx_timeout']))

        self.client = InfluxDBClient(
                args['--influx_host'],args['--influx_port'],
                args['--influx_user'], args['--influx_password'],
                args['--influx_db'], timeout = args['--influx_timeout'])

        self.influxdb_max_metrics = args['--influx_batch']

    def _generador_de_nombres(self, size=6, chars=string.ascii_uppercase + string.ascii_lowercase):
        return ''.join(random.choice(chars) for _ in range(size))

    def _generador_de_fechas(self, size=6, chars=string.ascii_uppercase + string.ascii_lowercase):
        """
        Genera una fecha random entre hoy y 30 dias atras
        Para evitar colisiones tambien se suma un numero de microsegundos aleatorio
        """
        base = int(datetime.now().strftime('%s'))
        resta = random.randint(0,30) * 86400
        fecha_segundos = base - resta
        fecha_microsegundos = fecha_segundos * 10e6
        micros_random = random.randint(0,10e6-1)

        return fecha_microsegundos + micros_random

    def _generar_medidas(self, num_medidas, num_valores, num_tags, tags_len):
        nombre = self._generador_de_nombres()

        values = [] 
        for i in range(0, num_valores):
            values.append("v_%s" % self._generador_de_nombres())

        tags = [] 
        for i in range(0, num_tags):
            tags.append("t_%s" % self._generador_de_nombres())

        data = []
        for n in range(0, num_medidas):
            data.append(self._generar_metrica(nombre, values, tags, tags_len))

        logger.debug("Medidas generadas para %s: %s", nombre, data)

        return data

    def _generar_metrica(self, nombre, values, tags_names, tags_len):
        """
        Para un determinado measurement genero una entrada con A valores y B tags
        La fecha se crea aleatoriamente
        """
        fecha = self._generador_de_fechas()

        fields = {}
        for v in values:
            fields.update({v: random.randint(0,10e3)})

        tags = {}
        for tag in tags_names:
            tags.update({tag: self._generador_de_nombres(tags_len)})

        metrica = {
            "measurement": nombre,
            "time": int(fecha),
            "tags": tags,
            "fields": fields
        }

        logger.debug("Metrica generada: %s", metrica)
        return metrica

    def _generar_proyecto(self, hosts, services, entradas_por_service, proyecto, batch):
        """
        Para un proyecto determinado, genera las entradas para todos sus hosts y services
        """
        for h,tags in hosts.iteritems():
            for srv,valores in services.iteritems():
                data = []

                for n in range(0, entradas_por_service):
                    fecha = self._generador_de_fechas()

                    fields = {}
                    for v in valores:
                        fields.update({v: random.randint(0,10e3)})

                    metrica = {
                        "measurement": srv,
                        "time": int(fecha),
                        "tags": tags,
                        "fields": fields
                    }
                    logger.debug("Metrica generada: %s", metrica)
                    data.append(metrica)

                self.client.write_points(data, batch_size=batch, database=proyecto)

    ############################################################################
    def simula_proyectos(self, args):
        """
Carga datos a como lo haria graphios en condiciones reales

Usage:
  capacity_influxdb.py simula_proyectos [-P=<num_proyectos>] [-H=<num_hosts>] [-S=<num_services>] [-V=<num_valores>] [-M=<num_metricas_h>] [-D=<num_dias>] [-T=<num_tags> ]

Options:
  -P,--proyectos=<num_proyectos>        Cuantos proyectos tenemos [default: 20]
  -H,--hosts=<num_hosts>                Cuantos hosts por proyecto [default: 40]
  -S,--services=<num_services>          Cuantos services por host [default: 25]
  -V,--valores=<num_valores>            Cuantos valores por cada metrica [default: 10]
  -M,--metricas=<num_metricas_h>        Cuantas metricas por hora [default: 6]
  -D,--dias=<num_dias>                  Cuantos dias vamos a querer almacenar los datos [default: 5]
  -T,--tags=<num_tags>                  Numero de tags agregadas a cada entrada, valores fijos [default: 3]
        """

        num_proyectos = int(args['--proyectos'])
        num_hosts = int(args['--hosts'])
        num_services = int(args['--services'])
        num_valores = int(args['--valores'])
        num_metricas = int(args['--metricas'])
        num_dias = int(args['--dias'])
        num_tags = int(args['--tags'])
        logger.info("Simulando carga para %s proyectos, con %s hosts cada uno. Cada host tiene %s services (con %s valores)" \
                "Se generan %s alarmas por hora. Y queremos almacenarlas %s dias. Tambien tenemos %s tags por cada alarma"
                    , num_proyectos, num_hosts, num_services, num_valores, num_metricas, num_dias, num_tags)

        databases = self.client.get_list_database()

        entradas_por_service = num_metricas * 24 * num_dias
        entradas_por_host = entradas_por_service * num_services
        entradas_por_proyecto = entradas_por_host * num_hosts
        entradas_por_measurement = entradas_por_service * num_hosts

        tags_keys = []
        for n in range(0, num_tags):
            tags_keys.append("t_%s" % self._generador_de_nombres())

        for m in tqdm(range(0, num_proyectos)):
            # Genero un dict con los hostnames para este proyecto y las tags de este host
            hosts = {}
            for i in range(0, num_hosts):
                hostname = "host_%s" % self._generador_de_nombres(size=16)

                tags = {}
                for t in tags_keys:
                    tags.update({t: self._generador_de_nombres()})

                hosts.update({hostname: tags})

            services = {}
            for i in range(0, num_services):
                service = "srv_%s_%s" % (self._generador_de_nombres(), entradas_por_measurement)

                valores = []
                for n in range(0, num_valores):
                    valores.append("v_%s" % self._generador_de_nombres())

                services.update({service: valores})

            batch = self.influxdb_max_metrics if entradas_por_proyecto > self.influxdb_max_metrics else entradas_por_proyecto

            proyecto = "p_%s_%s" % (self._generador_de_nombres(), entradas_por_proyecto)
            self.client.drop_database(proyecto) if proyecto in databases else None
            self.client.create_database(proyecto)

            logger.debug("Tenemos %s entradas por proyecto. Batch ajustado a %s", entradas_por_proyecto, batch)

            self._generar_proyecto(hosts, services, entradas_por_service, proyecto, batch)

            # Para proyectos grandes no se puede esperar a generarlo todo para escribir, nos quedamos sin memoria
            #logger.info("Escribiendo %s entradas para el proyecto %s", len(data), proyecto)
            #self.client.write_points(data, batch_size=batch, database=proyecto)

    ############################################################################

    ############################################################################
    def load_data(self, args):
        """
Carga datos segun los parametros especificados

Usage:
  capacity_influxdb.py load_data --measurements=<num_measurements> [--medidas=<num_medidas>] [--valores=<num_valores>] [--tags=<num_tags>] [--tags_len=<tags_len>]

Options:
  -M,--measurements=<num_measurements>  Cuantas medidas diferentes vamos a crear
  -E,--medidas=<num_medidas>            Cuantas medidas diferentes vamos a crear [default: 1]
  -V,--valores=<num_valores>            Cuantas values diferentes por medida [default: 1]
  -T,--tags=<num_tags>                  Cuantas tags diferentes por medida [default: 1]
  -L,--tags_len=<tags_len>              Tamaño de cada key y cada value [default: 5]
        """

        num_measurements = int(args['--measurements'])
        num_medidas = int(args['--medidas'])
        num_valores = int(args['--valores'])
        num_tags = int(args['--tags'])
        tags_len = int(args['--tags_len'])
        logger.info("Generando %s measurements, con %s medidas, cada una con %s valores y %s tags (de %s caracteres)"
                    , num_measurements, num_medidas, num_valores, num_tags, tags_len)

        for m in tqdm(range(0, num_measurements)):
            data = self._generar_medidas(num_medidas, num_valores, num_tags, tags_len)
            self.client.write_points(data, batch_size = self.influxdb_max_metrics)

    ############################################################################

################################################################################
#
def _execute_cmd(method, args):
    """
    Execute command
    """
    method(args)


def main():
    """
    Create a client, parse the arguments received on the command line and call
    the appropriate method.
    """
    try:
        args = docopt(__doc__, version=__version__, options_first=True)
    except DocoptExit as e:
        sys.stderr.write("ERROR: invalid parameters\n\n%s" % e.message)
        sys.exit(RETURN_CODE_ERROR)


    # set logging
    if args['--verbose']:
        logger.setLevel(logging.INFO)
    if args['--debug']:
        logger.setLevel(logging.DEBUG)

    cli = Client(args)

    cmd = args['<command>']

    # test if method exists
    if hasattr(cli, cmd):
        method = getattr(cli, cmd)
    else:
        sys.stderr.write("This command '%s' doesn't exist, try:\n%s --help" % (cmd, sys.argv[0]))
        sys.exit(RETURN_CODE_ERROR)

    # re-parse docopt with the relevant docstring from name of cmd
    docstring = method.__doc__.strip()
    if 'Usage:' in docstring:
        try:
            args.update(docopt(docstring, argv=sys.argv[sys.argv.index(cmd):]))
        except DocoptLanguageError as e:
            sys.stderr.write("ERROR: %s\n\n\n%s: %s\n" % (e.message, cmd, docstring))
            sys.exit(RETURN_CODE_ERROR)

    # execute the command
    _execute_cmd(method, args)

if __name__ == '__main__':
    main()
    sys.exit(0)
