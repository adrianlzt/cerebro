# try-catch
try do
  throw(:hello)
catch
  message -> "Got #{message}."
after
  IO.puts("I'm the after clause.")
end


# try-rescue
try do
  raise "some error"
rescue
  RuntimeError -> "rescued a runtime error"
  _error -> "this will rescue any error"
end


try do
  raise "some error"
rescue
  x in [RuntimeError] ->
    x.message
end
