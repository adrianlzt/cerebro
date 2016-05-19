package main
import (
	"fmt"
	"github.com/rackspace/gophercloud"
	"github.com/rackspace/gophercloud/openstack"
	"github.com/rackspace/gophercloud/pagination"
	"github.com/rackspace/gophercloud/openstack/compute/v2/servers"
	"github.com/rackspace/gophercloud/openstack/networking/v2/extensions/layer3/routers"
)


func main() {


	opts := gophercloud.AuthOptions{
		IdentityEndpoint: "https://ost.inet:5000/v2.0",
		Username: "USER",
		Password: "PASS",
		TenantName: "TENANT_NAME",
	}
	provider, err := openstack.AuthenticatedClient(opts)

	if err != nil {
		fmt.Println("AuthenticatedClient")
		fmt.Println(err)
		return
	}

	///////////////////////////////
	// Compute
	///////////////////////////////
	client_compute, err :=
	openstack.NewComputeV2(provider, gophercloud.EndpointOpts{})
	if err != nil {
		fmt.Println("NewComputeV2 Error:")
		fmt.Println(err)
		return
	}

	opts2 := servers.ListOpts{}
	pager := servers.List(client_compute, opts2)

	fmt.Println("Lista de VMs:")
	pager.EachPage(func(page pagination.Page) (bool, error) {
		serverList, err := servers.ExtractServers(page)

		if err != nil {
			return false, err
		}

		for _, s := range serverList {
			fmt.Println(s.ID, s.Name, s.Status)
		}
		return true, nil
	})

	///////////////////////////////
	// Network
	///////////////////////////////

	client_net, err :=
	openstack.NewNetworkV2(provider, gophercloud.EndpointOpts{})
	if err != nil {
		fmt.Println("NewNetworkV2 Error:")
		fmt.Println(err)
		return
	}
	opts_routers := routers.ListOpts{}
	pager_routers := routers.List(client_net, opts_routers)

	fmt.Println("Lista de routers:")
	err = pager_routers.EachPage(func(page pagination.Page) (bool, error) {
		routerList, err := routers.ExtractRouters(page)

		if err != nil {
			return false, err
		}

		for _, r := range routerList {
			fmt.Printf("Listing router: ID [%s] Name [%s] Status [%s] GatewayInfo [%#v]\n",
				r.ID, r.Name, r.Status, r.GatewayInfo)
		}
		return true, nil
	})
	if err != nil {
		fmt.Println("Router List pager Error:")
		fmt.Println(err)
		return
	}
}
