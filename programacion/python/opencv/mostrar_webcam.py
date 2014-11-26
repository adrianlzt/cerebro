import cv

cv.NamedWindow("webcam", 1)

cam = cv.CaptureFromCAM(-1)

while True:
  feed = cv.QueryFrame(cam)
  cv.ShowImage("webcam", feed)
  cv.WaitKey(1)
