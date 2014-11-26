import numpy as np
import cv2

# Load an color image in grayscale
img = cv2.imread('messi5.jpg',0)
cv2.imshow('image',img)
cv2.waitKey(0) # Este comando mostrara la ventana
cv2.destroyAllWindows() # Este comando cerrara la ventana
