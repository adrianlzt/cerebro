import cv2

cap = cv2.VideoCapture("video.mp4")

if not cap.isOpened():
    print("could not open video file")
    return


# Propiedades
http://docs.opencv.org/modules/highgui/doc/reading_and_writing_images_and_video.html#videocapture-get

Número de frames:
cap.get(cv2.CAP_PROP_FRAME_COUNT)

width  = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
fps    = cap.get(cv2.CAP_PROP_FPS)


# Definir propiedades
Mover el video a un frame determinado
cap.set(cv2.CAP_PROP_POS_FRAMES, 100)


# Guardar un frame a una imagen
success, frame = cap.read()
if success:
  cv2.imwrite("path_where_to_save_image", frame)
