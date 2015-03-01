# Como ansible busca que plugin ejecutar
/usr/lib/python2.7/site-packages/ansible/runner/__init__.py 
        module_path = utils.plugins.module_finder.find_plugin(module_name, module_suffixes, transport=self.transport)

