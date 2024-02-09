https://docs.ultralytics.com/es

# Uso
pip install ultralytics
yolo ...


# Entrenamiento
Hay ciertos datasets que ya conoce y se pueden usar simplemente especificando el nombre

Ejemplo:
yolo train data=coco128.yaml model=yolov8n.pt epochs=10 lr0=0.01


# Modelos

## YOLOv8
https://docs.ultralytics.com/models/yolov8/

Diferentes modelos en tamaño y funcionalidad.


## SAM
Puede usar otros modelos? El SAM de Meta:
https://docs.ultralytics.com/models/sam/

yolo predict model=sam_b.pt source=path/to/image.jpg

Nos genera una imagen en runs/segment/predict/ con las cajas de todo lo que ha seleccionado.


# Datasets
https://docs.ultralytics.com/datasets/

## Explorador GUI
pip install "ultralytics[explorer]"


## Roboflow
