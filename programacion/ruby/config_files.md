# Con YAML #
require 'yaml'
file_config = Yaml.load_file("/tmp/nagios")
puts file_config['last_update']

Para guardar configuración:
config['last_update'] = "other data"
File.open('data.yml','w') do |h| 
  h.write config.to_yaml
end

Lee un fichero yaml y actualiza las options que no se hayan definido por parametro
  def self.read_conf
    file_config = YAML.load_file(options.config_file)
    file_config.each do |k,v|
      options.send("#{k}=",v) unless options.send(k)
    end
  end


# Con ejecutable ruby #
https://medium.com/@darrenrush/ruby-is-the-ultimate-config-file-format-615ec2a2e467

actual_config = system(‘ruby app.conf.rb’)


 
# Con fichero de variables ruby #
http://stackoverflow.com/questions/8574206/ruby-how-to-import-a-variable-from-another-file
local_config.rb

Config.venv = 'venv'


config.rb

class Config
  class << self ; attr_accessor :venv ; end
  self.venv = '.'
end

begin
  require './local_config.rb'
rescue LoadError
end

puts Config.venv
