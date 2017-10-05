sysdig -pc
  Using -pc or -pcontainer, the default format will be changed to a container-friendly one:
  *%evt.num %evt.time %evt.cpu %container.name (%container.id) %proc.name (%thread.tid:%thread.vtid) %evt.dir %evt.type %evt.info


Filtrando por container.id
sysdig -pc container.id=206f03871ab0
