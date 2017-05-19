http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html
Did not account for increased latency after moving to EC2. In the datacenter they had submillisecond access between machines so it was possible to make a 1000 calls to memache for one page load. Not so on EC2. Memcache access times increased 10x to a millisecond which made their old approach unusable. Fix was to batch calls to memcache so a large number of gets are in one request.


https://segment.com/blog/the-million-dollar-eng-problem/
Cuidado con los costes



https://news.ycombinator.com/item?id=13889557
I really feel like egress traffic costs is the most overlooked issue with popular cloud services like AWS or Google Cloud. Charging 9 or 12 cents for a mere GB of regular traffic is just insane, keeping in mind that even most CDNs are cheaper.
Data driven applications on AWS are already expensive because of the high traffic costs, but storing/serving media on S3 single handedly lets your bill explode. For everyone who feels like the statements above are exaggerations, just check out their actual prices (https://aws.amazon.com/ec2/pricing/on-demand/) in comparison with a regular CDN (https://www.stackpath.com/pricing/).


https://news.ycombinator.com/item?id=14366881
empresa haciendo un programa para analizar los costes
