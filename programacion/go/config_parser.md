https://github.com/bigkevmcd/go-configparser/

go get github.com/bigkevmcd/go-configparser


# Ejemplo
import "github.com/bigkevmcd/go-configparser"
...

nova_conf_file := "/etc/nova/nova.conf"
nova_conf, err := configparser.NewConfigParserFromFile(nova_conf_file)
if err != nil {
	check.AddResultf(nagiosplugin.UNKNOWN, "ConfigParser: error opening %v: %s", nova_conf_file, err)
	return
}

mem_allocation_ratio, err := nova_conf.Get("DEFAULT","ram_allocation_ratio")
if err != nil {
	check.AddResultf(nagiosplugin.UNKNOWN, "ConfigParser: error reading mem_allocation_ratio param: %s", err)
	return
}
