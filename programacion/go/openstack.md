https://github.com/rackspace/gophercloud

Parece que este es el binding que queda más activo


Llamar a un endpoint que no esta implementado directamente (/v2/3c07d00408924c6081aebacb8e33c4e9/os-availability-zone/detail):


  var res extensions.GetResult
  client.Get(client.ServiceURL("os-availability-zone/detail"), &res.Body, nil)
  log.WithField("res", res).Info("Respuesta client get")

	jsonParsed, err := gabs.Consume(res.Body)
	if err != nil {
		check.AddResultf(nagiosplugin.UNKNOWN, "error parsing Availability Zone json data: %s", err)
		return nil, err
	}

	azs_hosts := make(map[string][]string)
	azs,_ := jsonParsed.S("availabilityZoneInfo").Children()
	for _,az := range azs {
		name := az.Path("zoneName").Data().(string)

		hosts,_ := az.S("hosts").ChildrenMap()
		for hostname,_ := range hosts {
			azs_hosts[name] = append(azs_hosts[name], hostname)
		}

	}
