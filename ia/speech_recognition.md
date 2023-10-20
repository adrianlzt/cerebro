mirar tts/validate_audio_to_text.md


mirar tts/fairseq-meta.md

https://openai.com/blog/whisper/



Whisper JAX is an optimised implementation of the Whisper model by OpenAI. It runs on JAX with a TPU v4-8 in the backend. Compared to PyTorch on an A100 GPU, it is over 70x faster, making it the fastest Whisper API available.
https://huggingface.co/spaces/sanchit-gandhi/whisper-jax

https://github.com/guillaumekln/faster-whisper


# whisperx
https://github.com/m-bain/whisperX
faster-whisper + alineamiento + diariazion (pyannote)

Opciones interesantes:
--model {tiny.en|tiny|base.en|base|small.en|small|medium.en|medium|large-v1|large-v2|large}
  sacado de import: faster_whisper; faster_whisper.available_models()
--language {es|en|etc}
--compute_type {float16,float32,int8}
--no_align
--diarize
--print_progress true
--hf_token huggingfaceToken
  necesario para los modelos de Segmentation, Voice Activity Detection (VAD) and Speaker Diarization
