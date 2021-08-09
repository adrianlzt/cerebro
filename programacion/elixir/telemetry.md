https://hexdocs.pm/telemetry/readme.html
Dynamic dispatching library for metrics and instrumentations

https://elixirschool.com/blog/instrumenting-phoenix-with-telemetry-part-one/
entiendiendo telemetry y ejemplos prácticos.

Las librerías lo implementan, emitiendo eventos.
Por ejemplo en ecto: https://hexdocs.pm/ecto/Ecto.Repo.html#module-telemetry-events

https://github.com/beam-telemetry/telemetry/blob/main/src/telemetry.erl

Luego podemos definir handlers y unirlos (attach) con determinados eventos.
:ok = :telemetry.attach("log-response-handler", [:web, :request, :done], &LogResponseHandler.handle_event/4, nil)
  cuando llegue el evento "[:web, :request, :done]", llama a la función "&LogResponseHandler.handle_event/4"
  "log-response-handler" será un identificador único que no puede repetirse

También tenemos attach_many, para unir varios eventos a un mismo handler.
