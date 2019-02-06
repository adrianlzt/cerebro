package somepackage

import (
	"log"

	"github.com/influxdata/telegraf"
	"github.com/influxdata/telegraf/plugins/inputs"
)

type Ccms struct {
	Host     string
	User     string
	Password string
	Sysnr    string
	Mte      mte
}

type mte []struct {
	Set         string
	Monitor     string
	Object      string
	Mte         string
	Measurement string
}

var sampleConfig = `
  [[inputs.ccms]]
	host = "somehost"
	user = "user"
	password = "password"
	sysnr = "00"

  ## Define the toml config where the MTE queries are stored
  #
  ## Structure :
  ## [[inputs.ccms.mte]]
	##   set string
	##   monitor string
	##   object string
	##   mte string
  [[inputs.ccms.mte]]
	  set = "SAP CCMS Monitor Templates"
	  monitor = "Entire System"
	  object = "R3Abap"
	  mte = "Shortdumps Frequency"
	  measurement = "abap.shortdumps_freq_per_min"
`

func (c *Ccms) SampleConfig() string {
	return sampleConfig
}

func (c *Ccms) Description() string {
	return "Read metrics from CCMS"
}

func (c *Ccms) Gather(acc telegraf.Accumulator) error {
	fields := make(map[string]interface{})
	tags := make(map[string]string)

	fields["test"] = 1
	tags["foo"] = "bar"

	acc.AddFields("example", fields, tags)

	log.Println("D! Mensaje debug")
	log.Println("I! Mensaje info")
	log.Println("W! Mensaje warning")
	log.Println("E! Mensaje error")
	return nil
}

func init() {
	inputs.Add("ccms", func() telegraf.Input {
		return &Ccms{}
	})
}
