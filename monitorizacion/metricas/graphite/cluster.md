https://grey-boundary.io/the-architecture-of-clustering-graphite/

Lastly, there's other considerations as well. If you're rearranging or changing the number of nodes, the hash ring has to be recalculated and the placement of your Whisper files will change, and there's repercussions to that (minimally, much more storage consumption). That sort of goes beyond a comment reply, but I'd suggest looking at some of Jason's articles, along with the Carbonate tool he linked. These are also topics I do plan on posting on in the future.
