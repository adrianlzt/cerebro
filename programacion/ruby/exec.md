http://mentalized.net/journal/2010/03/08/5_ways_to_run_commands_from_ruby/

rc = system("ls")

rc sera true o false (RC!=0)


require 'open3'
stdin, stdout, stderr, wait_thr = Open3.popen3('comando')
stdout.readlines
stderr.readlines
wait_thr.value.exitstatus
wait_thr.value.pid

Open3.popen3({"VAR" => "pepe"}, "echo $VAR"){|stdin, stdout, stderr, wait_thr|
  puts stdout.read()
}


Para tener todo en stdout
stdin, stdout, stderr, wait_thr = Open3.popen3('ifconfig -asd 2>&1')
