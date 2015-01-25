# Modificado por mi para dar mas informacion
#!/home/mqtester/.rvm/wrappers/ruby-1.9.2-p290@mqtester/ruby
# encoding: utf-8

require "rubygems"
require "amqp"

@exchange_name = "amq.rabbitmq.trace"

class Consumer
  def handle_message(metadata, payload)
     puts "metadata.routing_key : #{metadata.routing_key}"
     puts "metadata.content_type: #{metadata.content_type}"
     puts "metadata.priority    : #{metadata.priority}"
     puts "metadata.headers     : #{metadata.headers.inspect}"
     puts "metadata.timestamp   : #{metadata.timestamp.inspect}"
     puts "metadata.type        : #{metadata.type}"
     puts "metadata.consumer_tag: #{metadata.consumer_tag}"
     puts "metadata.delivery_tag: #{metadata.delivery_tag}"
     puts "metadata.redelivered : #{metadata.redelivered?}"
     puts "metadata.correlation_id: #{metadata.correlation_id}"
     puts "metadata.exchange      : #{metadata.exchange}"
     puts "Message: #{payload}."
     puts "////////////////////////////////////////////"
  end
end

class Worker
  def initialize(channel, exchange_name, queue_name, consumer = Consumer.new)
    @exchange_name = exchange_name
    @queue_name = queue_name

    @channel = channel
    @channel.on_error(&method(:handle_channel_exception))

    @consumer = consumer
  end

  def start
    @exchange = @channel.topic(@exchange_name, :durable => true, :auto_delete => false, :internal => true)
    @queue = @channel.queue(@queue_name, :durable => false, :auto_delete => true)
    @queue.bind(@exchange, :routing_key => '#')
    @queue.subscribe(&@consumer.method(:handle_message))
  end

  def handle_channel_exception(channel, channel_close)
    puts "Oops... a channel-level exception: code = #{channel_close.reply_code}, message = #{channel_close.reply_text}"
  end
end

AMQP.start("amqp://user:password@localhost/vhost") do |connection, open_ok|
  channel = AMQP::Channel.new(connection)
  worker = Worker.new(channel, @exchange_name, '')
  worker.start
end
