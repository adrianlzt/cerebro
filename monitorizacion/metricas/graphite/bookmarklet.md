http://obfuscurity.com/2012/04/Unhelpful-Graphite-Tip-2

The next time someone sends you the link to a graph, load up your Graphite composer and then hit that bookmarklet. Paste in the link and click Ok.

Dirección a guardar como bookmarklet
javascript:url=prompt("Enter url");if (url)
{content.Compose.loadMyGraph("temp",decodeURIComponent(url));};
