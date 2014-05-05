Si queremos cargar librerias ruby de terceros la forma cutre:

config/application.rb:
module MonitorizacionUI
  class Application < Rails::Application
    ...
    config.autoload_paths += %W(#{config.root}/lib)
  end
end



lib/ost.rb:
require 'rubygems'
require 'fog'

class Ost
  def floating_ips
    ...



En el controller:
class MonitController < ApplicationController
  require 'ost'

  def openstack
    @client_ip = request.remote_ip

    ost = ::Ost.new
    ost.floating_ips

