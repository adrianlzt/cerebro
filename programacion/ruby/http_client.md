https://github.com/lostisland/faraday

Faraday is an HTTP client lib that provides a common interface over many adapters (such as Net::HTTP) and embraces the concept of Rack middleware when processing the request/response cycle.


# TLS
https://gist.github.com/mislav/938183

connection = Faraday.new 'https://example.com', :ssl => {
    :client_cert  => ...,
    :client_key   => ...,
    :ca_file      => ...,
    :ca_path      => ...,
    :cert_store   => ...
  }
