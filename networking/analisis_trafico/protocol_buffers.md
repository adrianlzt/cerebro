# OTEL

Ejemplo mostrando el contenido de un protobuf de opentelemetry que se encuentra en un frame de una captura

```bash
git clone https://github.com/open-telemetry/opentelemetry-proto.git
cd opentelemetry-proto
tshark -r capture.pcap -Y "frame.number == 130" -T fields -e http.file_data 2>/dev/null | xxd -r -p | protoc --decode opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest -I . opentelemetry/proto/collector/trace/v1/trace_service.proto
```
