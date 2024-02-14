Top para nvidia
nvtop

Stress test
https://github.com/wilicc/gpu-burn
http://wili.cc/blog/gpu-burn.html

docker run --gpus all --rm oguzpastirmaci/gpu-burn <test duration in seconds>


# GPU over ip
https://github.com/Juice-Labs/Juice-Labs

Para el server usar:
docker run --rm -it --gpus all -p 43210:43210 juicelabs/server:11.8-2023.08.10-2103.0633b794

Para el cliente me he descargado el contenido de /root de esta imagen juicelabs/client:2023.08.10-2103.0633b794
Y creado un venv con:
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

```
➜ ./juicify python -c "import torch; print(torch.cuda.is_available())"
2024/02/14 06:52:21 Info: juicify, v0.0.0
2024/02/14 06:52:21 Info: Connected to redacted.com:43210, v0.0.0
2024-02-14 07:52:22.291 client.cpp:519 221155 I] Build: 2023.08.10-2103.0633b794
2024-02-14 07:52:22.307 client.cpp:690 221155 I] Loading CUDA modules locally for PyTorch or TensorFlow
2024-02-14 07:52:22.307 client.cpp:834 221155 I] Requesting session from assistify.es:43210
2024-02-14 07:52:22.928 client.cpp:690 221155 I] Loading CUDA modules locally for PyTorch or TensorFlow
True
```
