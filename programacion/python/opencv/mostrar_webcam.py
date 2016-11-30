import cv2

cap = cv2.VideoCapture(-1)

while True:
    ret ,frame = cap.read()
    if ret:
        cv2.imshow('img2',frame)
        cv2.waitKey(60)

cv2.destroyAllWindows()
cap.release()
