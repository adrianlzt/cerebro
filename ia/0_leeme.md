https://www.coursera.org/learn/machine-learning
pruebo empezando con este curso

Tal vez cursos prácticos de google?
https://cloud.google.com/training/machinelearning-ai

Mirar time_series.md

mirar machine_learning.md
mirar esquema.md



Discusión de si es mejor empezar top-to-bottom o al revés
https://news.ycombinator.com/item?id=21924298

Buscar que frameworks se utilizan actualmente.
pytorch / tensorflow
Usar tensorflow (es el que se usa en LoudML)

Jugar con alguno de ellos intentando resolver algún problema de Kaggle.
Esto será un poco a ciegas, solo para intentar ir entediendo como se usan y que intentamos resolver.


Conceptos importantes (sacados de comentarios del enlace de hackernews):
  De estadística (https://news.ycombinator.com/item?id=21925212):
    - biology basis stats (to know how to compare means - this gives you the A/B test superpower)
    - psychology factor analysis (to know PCA - this gives you the dimension reduction superpower)
    - econometrics basic regression (to know linear regression)

  - back propagation
  - differentiation and gradient flow

Entender que tipos de modelos tenemos, de forma genérica

Acercarnos a los problemas de detección de anomalías intentando implementar los distintos casos que explican en el paper de donut
https://arxiv.org/abs/1802.03903



https://news.ycombinator.com/item?id=21926560

1. Get a solid foundation in linear algebra. A lot of machine learning can be formulated in terms of a series of matrix operations, and sometimes it makes more sense to. I thought Coding the Matrix was pretty good, especially the first few chapters.

2. Read up on some basic optimization. Most of the time it makes the most sense to formulate the algorithm in terms of optimization. Usually, you want to minimize some loss function and thats simple, but regularization terms make things tricky. It’s also helpful to learn why you would regularize.

3. Learn a little bit of probability. The further you go the more helpful it will be when you want to run simulations or something like that. Jaynes has a good book but I wouldn’t say it’s elementary.

4. Learn statistical distributions: Gaussian, Poisson, Exponential, and beta are the big ones that I see a lot. You don’t have to memorize the formulas (I also look them up) but know when to use them.

While you’re learning this, play with linear regression and it’s variants: polynomial, lasso, logistic, etc. For tabular data, I always reach for the appropriate regression before I do anything more complicated. It’s straightforward, fast, you get to see what’s happening with the data (like what transformations you should perform or where you’re missing data), and it’s interpretable. It’s nice having some preliminary results to show and discuss while everyone else is struggling to get not-awful results from their neural networks.

Then you can really get into the meat with machine learning. I’d start with tree-based models first. They’re more straightforward and forgiving than neural networks. You can explore how the complexity of your models effects the predictions and start to get a feel for hyper-parameter optimization. Start with basic trees and then get into random forests in scikit-learn. Then explore gradient boosted trees with XGBoost. And you can get some really good results with trees. In my group, we rarely see neural networks outperform models built in XGBoost on tabular data.

Most blog posts suck. Most papers are useless. I recommend Geron’s Hands-On Machine Learning.

Then I’d explore the wide world of neural networks. Start with Keras, which really emphasizes the model building in a friendly way, and then get going with PyTorch as you get comfortable debugging Keras. Attack some object classification problems with-and-without pretrained backends, then get into detection and NLP. Play with weight regularization, batch norm and group norm, different learning rates, etc. If you really want to get deep into things, learn some CUDA programming too.

I really like Chollet’s Deep Learning with Python.

After that, do what you want to do. Time series, graphical models, reinforcement learning— the field’s exploded beyond simple image classification.
