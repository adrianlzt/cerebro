import collectd
import random

# global variables


def config_processes(conf):
  collectd.info('processes: configuring...')

def init_processes():
  collectd.info('processes: initing...')

def read_processes(data=None):
  collectd.info("processes: reading data...")
  vl = collectd.Values(type='gauge')
  vl.plugin='processes'
  vl.dispatch(values=[random.random() * 100])


collectd.register_config(config_processes)
collectd.register_init(init_processes)
collectd.register_read(read_processes)
