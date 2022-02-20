https://github.com/NVlabs/instant-ngp

Si tengo problemas compilando, mirar sus instrucciones y mirar si tenemos alguna de estas versiones
Fixed for GCC 10.4, 11.2 and 12.

Para preparar el video hace falta usar el script instant-ngp/scripts/colmap2nerf.py
Hacen falta unas cuantas libs de python.

Yo he usado el entorno "ml" de conda que tengo, tras instalar opencv.

Pongo el video que quiero procesar en data/nerf/nombreCarpeta

Miramos la duración del video con ffprobe.
Cogemos un valor de --video_fps para sacar unos 50-150 fotogramas (por ejemplo, 10 fps para un video de 5")
Ejecuto con:
python scripts/colmap2nerf.py --video_in data/nerf/nombreCarpeta/VID_XXX.mp4 --video_fps 10 --run_colmap --aabb_scale 16

Nos crea en PWD el fichero transforms.json, que moveremos a data/nerf/nombreCarpeta
En data/nerf/nombreCarpeta/images tendremos las imágenes que habrá extraído del vídeo.

Ejecutamos con:
./build/testbed --scene data/nerf/nombreCarpeta

