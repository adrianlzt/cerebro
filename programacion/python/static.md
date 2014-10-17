Cuando tenemos un staticmethod no se pone self en los métodos:


class Cosa(object):

    @staticmethod
    def read_conf(conf_file):
        ...
