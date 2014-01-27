http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html

Put everything into a queue. Votes, comments, thumbnail creation, precomputed queries, spam processing and corrections. Queues allow you to know when there’s a problem by monitoring queue lengths. Side benefit is queues hide problems from users because things like vote requests are in the queue and if they aren’t applied immediately nobody notices.
