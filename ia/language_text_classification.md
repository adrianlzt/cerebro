https://modelpredict.com/language-identification-survey

https://pypi.org/project/fasttext/

wget https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin
pip install fasttext
import fasttext
model = fasttext.load_model("lid.176.bin")
model.predict(comment.lower(), k=3)


Ejemplo de respuesta
>>> r = model.predict("this variable takes foo and do baz", k=3)
>>> r
(('__label__en', '__label__de', '__label__uk'), array([0.77796429, 0.020678  , 0.01131664]))
