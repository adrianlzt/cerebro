man parallel

ls *.png | parallel -j4 convert {} {.}.jpg
