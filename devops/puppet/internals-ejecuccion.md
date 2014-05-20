En application/ están todos los comandos a ejecutar
    #37 Puppet::Application::Apply.run_command 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/application/apply.rb:151

    #38 Puppet::Application.run(step#String) 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/application.rb:371

    #39 Puppet::Util.run(message#String, code#Fixnum) 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/application.rb:371

    #40 Puppet::Context.run(bindings#Hash, description#String) 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/application.rb:371

    #41 Puppet.override(bindings#Hash, description#String) 
       at line /usr/lib/ruby/site_ruby/1.8/puppet.rb:234

    #42 Puppet::Context.run(bindings#Hash, description#String) 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/application.rb:361

    #43 Puppet.override(bindings#Hash, description#String) 
       at line /usr/lib/ruby/site_ruby/1.8/puppet.rb:234

Ejecucción de puppet con las siguientes etapas:
  preinit
  parse_options
  setup
  configure_indirector_routes
  run_command
    #44 Puppet::Application.run 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/application.rb:356

Aqui carga el código de modulepath excepto para agent y master
    #45 Puppet::Util::CommandLine::ApplicationSubcommand.run 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/util/command_line.rb:139

Coge los parámetros
    #46 Puppet::Util::CommandLine.execute 
       at line /usr/lib/ruby/site_ruby/1.8/puppet/util/command_line.rb:93
