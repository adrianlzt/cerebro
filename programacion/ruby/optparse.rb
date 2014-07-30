#!/usr/bin/env ruby
#
# http://ruby-doc.org/stdlib-2.1.2/libdoc/optparse/rdoc/OptionParser.html
#
# Si tenemos muchas opciones mirar como lo hace https://github.com/jimweirich/rake/blob/master/lib/rake/application.rb
# def handle_options
# def standard_rake_options
#

require 'pp'
require 'optparse'
require 'ostruct'
require 'rubygems'

module Prueba
  module Application

    DEFAULT_NAME = 'localhost'
    CONF_FILE = "/etc/collectd/nagios.yaml"

    def self.options
      @options ||= OpenStruct.new
    end
    
    def self.handle_options
      OptionParser.new do |opts|
        opts.banner = "Usage: example.rb [options]"
      
        opts.on('-n', '--sourcename NAME', 'Source name') { |v| options.source_name = v }
        opts.on('-f', '--config_file FILE', 'Config file') { |v| options.config_file = v }
        opts.on("-v", "--[no-]verbose", "Run verbosely") { |v| options.verbose = v }
        opts.on_tail("-h", "--help", "-H", "Display this help message.") do
          puts opts
          exit
        end
      
      end.parse!
    end
    
    # Mete en options las variable del fichero yaml
    # No sobreescribe las opciones si ya estaban definidas por parametro
    # Pero tampoco sobreescribirá los DEFAULT
    def self.conf_file
      file_config = YAML.load_file(options.config_file)
      file_config.each do |k,v|
        options.send("#{k}=",v) unless options.send(k)
      end
    end

    def self.set_defaults
      options.source_name = DEFAULT_NAME
      options.config_file = CONF_FILE
    end
    
    def self.run 
      begin
        handle_options
        conf_file
        set_defaults
      rescue OptionParser::InvalidOption => ex
        $stderr.puts ex.message
        exit(false)
      end

      puts options.to_s
    end
  end
end  

Prueba::Application.run
