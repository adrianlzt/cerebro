# https://github.com/gearman-ruby/gearman-ruby/blob/master/examples/calculus_worker.rb
# https://github.com/gearman-ruby/gearman-ruby/blob/master/examples/calculus_client.rb

# gem install gearman-ruby


# Cliente dummy que inserta tareas
require 'rubygems'
require 'gearman'
client = Gearman::Client.new('192.168.51.3:4730')
taskset = Gearman::TaskSet.new(client)
task = Gearman::Task.new("puppet", "nombrenodo")
task.on_complete {|r| puts "[client] result is: #{r}" }
taskset.add_task(task)


# Worker tonto
#!/usr/bin/env ruby
require 'rubygems'
require 'gearman'
worker = Gearman::Worker.new('192.168.51.3:4730')
worker.reconnect_sec = 2
worker.add_ability('puppet') do |data,job|
  host_job_id = data
  puts "[puppet woker] Generation configuratio for #{host_job_id}"
  "return value"
end
# Running the workers
loop do
  worker.work
end
# Worker tonto que lee las tareas
