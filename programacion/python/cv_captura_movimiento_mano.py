import cv2
import numpy as np

# El threshold depende del size de la captura
# Para 640x480 creo que habria que ponerlo en 100000
THRESHOLD=10000
WIDTH=180
HEIGHT=120
REPETIDO=5
IZQUIERDA=1
DERECHA=2

def lado(img,prev):
    # convertir a gris
    imgBN = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    prevBN = cv2.cvtColor(prev, cv2.COLOR_RGB2GRAY)

    flow = cv2.calcOpticalFlowFarneback(prevBN, imgBN, 0.5, 3, 15, 3, 5, 1.2, 0)
    
    A=0
    for x in range(0,len(flow)):
        A+=np.sum(flow[x], axis=0)
    
    #print "Frame " + str(frame)

    X = A[0]
    if X < -THRESHOLD:
        print "izquierda "+str(X)
        return IZQUIERDA
    elif X > THRESHOLD:
        print "derecha "+str(X)
        return DERECHA
    else:
        return 0

cap = cv2.VideoCapture(0)
cap.set(3,WIDTH)
cap.set(4,HEIGHT)


ret,prev = cap.read()
frame = np.zeros((512,512,3), np.uint8)
lprev=0
c=0
while True:
    ret,img = cap.read()
    l = lado(img,prev)

    if l == lprev and l != 0:
        c+=1
    lprev=l

    if c > REPETIDO:
        if l == IZQUIERDA:
            print "mostrar_flecha izquierda"
            frame = np.zeros((512,512,3), np.uint8)
            cv2.line(frame,(0,250),(511,250),(255,0,0),5)
            cv2.line(frame,(0,250),(30,280),(255,0,0),5)
            cv2.line(frame,(0,250),(30,220),(255,0,0),5)
        elif l == DERECHA:
            print "mostrar_flecha derecha"
            frame = np.zeros((512,512,3), np.uint8)
            cv2.line(frame,(0,250),(511,250),(0,0,255),5)
            cv2.line(frame,(491,220),(511,250),(0,0,255),5)
            cv2.line(frame,(491,280),(511,250),(0,0,255),5)
        c=0

    #linea = cv2.line(mask,(0,0),(100,100),[243, 136, 254],2)
    cv2.imshow('direccion', frame)
    cv2.imshow('frame', img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    prev = img
    ret,img = cap.read()

cap.release()
cv2.destroyAllWindows()
