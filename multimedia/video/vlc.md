# Live streaming
https://wiki.videolan.org/Documentation:Streaming_HowTo/Command_Line_Examples/#RTSP_live_streaming

## Stream with RTSP and RTP
Run on the server:
vlc -vvv input_stream --sout '#rtp{dst=192.168.0.12,port=1234,sdp=rtsp://server.example.org:8080/test.sdp}' 

Run on the client(s):
vlc rtsp://server.example.org:8080/test.sdp
