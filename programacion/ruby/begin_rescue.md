http://crodrigues.com/try-catch-finally-equivalent-in-ruby/

begin
    some_code
rescue
     handle_error
ensure
    this_code_is_always_executed
end


Como lo hace rake:

# Provide standard exception handling for the given block.
def standard_exception_handling # :nodoc:
  yield
rescue SystemExit
  # Exit silently with current status
  raise
rescue OptionParser::InvalidOption => ex
  $stderr.puts ex.message
  exit(false)
rescue Exception => ex
  # Exit with error message
  display_error_message(ex)
  exit_because_of_exception(ex)
end

def run
  standard_exception_handling do
    init
    load_rakefile
    top_level
  end
end
