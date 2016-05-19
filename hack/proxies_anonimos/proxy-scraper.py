######################################################################
################ http://scrapeomatic.blogspot.com/ ###################
######################################################################
##################### Proxy Scraper Script V1.2 ######################
######################################################################
######################################################################
###################### http://proxy-list.org #########################
##################### http://www.us-proxy.org ########################
#################### http://free-proxy-list.net ######################
#################### http://www.cool-proxy.net #######################
####################### http://www.samair.ru #########################
#################### http://www.proxylisty.com #######################
######################## http://nntime.com ###########################
#################### http://www.aliveproxy.com #######################
######################################################################

import urllib, urllib2
import time, datetime
import threading, Queue
import re
import StringIO, gzip
import sys

######################################################################
############################ Settings ################################
######################################################################
debug = False
######################################################################
######################################################################

def bug(line):
	if debug == True:
		print "Debug:: " + line

def queueThread():
	global proxyCount
	ts = time.time()
	dt = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d-%H-%M-%S')
	print "Saving to proxylist-" + dt + ".txt"
	fout = open("proxylist-" + dt + ".txt", "w")

	while not workerQueue.empty():
		fout.write(workerQueue.get() + "\n")
		proxyCount+=1
	fout.close()

def proxylist():
	print "Grabbing: http://proxy-list.org/"
	primary_url = "http://proxy-list.org/english/index.php?p="
	urls = []
	for i in range(1, 11):
		urls.append(primary_url + str(i))

	for url in urls:
		try:
			bug("grabbing " + "'" + url + "'")
			opener = urllib2.build_opener()
			opener.addheaders = [('Host', 'www.proxylisty.com'),
								 ('Connection', 'keep-alive'),
								 ('Cache-Control', 'max-age=0'),
								 ('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
								 ('Upgrade-Insecure-Requests', '1'),
								 ('User-agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'),
								 ('Referer', 'https://www.google.co.za/'),
								 ('Accept-Encoding','gzip, deflate, sdch'),
								 ('Accept-Language','en-US,en;q=0.8')]

			response = opener.open(url, timeout=10)
			compressedFile = StringIO.StringIO()
			compressedFile.write(response.read())
			compressedFile.seek(0)
			decompessedFile = gzip.GzipFile(fileobj=compressedFile, mode='rb')
			html = decompessedFile.read()

			templs = re.findall(r'<li class="proxy">([1-99999].*)?</li>', html)
			for line in templs:
				workerQueue.put(line)
				bug("proxylist() " + line)

		except Exception, e:
			if e.message == " ":
				bug(e.message)
				bug("Failed to grab " + "'" + url + "'")
			else:
				bug("Failed to grab " + "'" + url + "'")
		

def usproxy():
	print "Grabbing: http://www.us-proxy.org/"
	templs = []
	url = "http://www.us-proxy.org/"
	try:
		bug("grabbing " + "'" + url + "'")
		opener = urllib2.build_opener()
		opener.addheaders = [('Host', 'www.proxylisty.com'),
							('Connection', 'keep-alive'),
							('Cache-Control', 'max-age=0'),
							('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
							('Upgrade-Insecure-Requests', '1'),
							('User-agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'),
							('Referer', 'https://www.google.co.za/'),
							('Accept-Encoding','gzip, deflate, sdch'),
							('Accept-Language','en-US,en;q=0.8')]

		response = opener.open(url, timeout=10)
		html = response.read()

		templs = re.findall(r'<tr><td>(.*?)</td><td>', html)
		templs2 = re.findall(r'</td><td>[1-99999].*?</td><td>', html)

		for i in range(len(templs)):
			temp = templs[i] + ":" + templs2[i].replace('</td><td>', '')
			workerQueue.put(temp)
			bug("usproxy() " + templs[i] + ":" + templs2[i].replace('</td><td>', ''))

	except Exception, e:
		if e.message == " ":
			bug(e.message)
			bug("Failed to grab " + "'" + url + "'")
		else:
			bug("Failed to grab " + "'" + url + "'")


def freeproxylist():
	print "Grabbing: http://free-proxy-list.net/"
	url = "http://free-proxy-list.net/"
	try:
		bug("grabbing " + "'" + url + "'")
		opener = urllib2.build_opener()
		opener.addheaders = [('Host', 'www.proxylisty.com'),
							('Connection', 'keep-alive'),
							('Cache-Control', 'max-age=0'),
							('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
							('Upgrade-Insecure-Requests', '1'),
							('User-agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'),
							('Referer', 'https://www.google.co.za/'),
							('Accept-Encoding','gzip, deflate, sdch'),
							('Accept-Language','en-US,en;q=0.8')]

		response = opener.open(url, timeout=10)
		html = response.read()

		templs = re.findall(r'<tr><td>(.*?)</td><td>', html)
		templs2 = re.findall(r'</td><td>[1-99999].*?</td><td>', html)

		for i in range(len(templs)):
			workerQueue.put(templs[i] + ":" + templs2[i].replace('</td><td>', ''))
			bug("freeproxylist() " + templs[i] + ":" + templs2[i].replace('</td><td>', ''))

	except Exception, e:
		if e.message == " ":
			bug(e.message)
			bug("Failed to grab " + "'" + url + "'")
		else:
			bug("Failed to grab " + "'" + url + "'")


def coolproxy():
	print "Grabbing: http://www.cool-proxy.net/"
	primary_url = "http://www.cool-proxy.net/proxies/http_proxy_list/sort:score/direction:desc/page:"
	urls = []
	for i in range(1, 13):
		urls.append(primary_url + str(i))

	for url in urls:
		bug("grabbing " + "'" + url + "'")
		try:
			opener = urllib2.build_opener()
			opener.addheaders = [('Host', 'www.proxylisty.com'),
								 ('Connection', 'keep-alive'),
								 ('Cache-Control', 'max-age=0'),
								 ('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
								 ('Upgrade-Insecure-Requests', '1'),
								 ('User-agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'),
								 ('Referer', 'https://www.google.co.za/'),
								 ('Accept-Encoding','gzip, deflate, sdch'),
								 ('Accept-Language','en-US,en;q=0.8')]

			response = opener.open(url, timeout=10)
			compressedFile = StringIO.StringIO()
			compressedFile.write(response.read())
			compressedFile.seek(0)
			decompessedFile = gzip.GzipFile(fileobj=compressedFile, mode='rb')
			html = decompessedFile.read()

			templs = re.findall(r'str_rot13(.*?)</script>', html)
			templs2 = re.findall(r'<td>[1-99999].*?</td>', html)

			for i in range(len(templs)):
				temp = templs[i].replace('("', '')#remove front of string
				temp = temp.replace('")))', '')#remove back of string
				temp = temp.decode('rot13').decode('base64')#decode from rot13 then from base64
				workerQueue.put(temp + templs2[i].replace('<td>', ':').replace('</td>', ''))
				bug("coolproxy() " + temp + templs2[i].replace('<td>', ':').replace('</td>', ''))
		
		except Exception, e:
			if e.message == " ":
				bug(e.message)
				bug("Failed to grab " + "'" + url + "'")
			else:
				bug("Failed to grab " + "'" + url + "'")


def samair():
	print "Grabbing: http://www.samair.ru/"
	primary_url = "http://www.samair.ru/proxy/proxy-00.htm"
	urls = []

	for i in range(1, 31):
		if i < 10:
			urls.append(primary_url.replace("00", "0" + str(i)))
		else:
			urls.append(primary_url.replace("00", str(i)))

	for url in urls:
		try:
			bug("grabbing " + "'" + url + "'")
			opener = urllib2.build_opener()
			opener.addheaders = [('Host', 'www.proxylisty.com'),
								 ('Connection', 'keep-alive'),
								 ('Cache-Control', 'max-age=0'),
								 ('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
								 ('Upgrade-Insecure-Requests', '1'),
								 ('User-agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'),
								 ('Referer', 'https://www.google.co.za/'),
								 ('Accept-Encoding','gzip, deflate, sdch'),
								 ('Accept-Language','en-US,en;q=0.8')]

			response = opener.open(url, timeout=10)
			compressedFile = StringIO.StringIO()
			compressedFile.write(response.read())
			compressedFile.seek(0)
			decompessedFile = gzip.GzipFile(fileobj=compressedFile, mode='rb')
			html = decompessedFile.read()

			links = re.findall(r'<tr><td>(.*?):(.*?)</td><td>', html)
			for link in links:
				workerQueue.put(link[0] + ":" + link[1])
				bug("samair() " + link[0] + ":" + link[1])

		except Exception, e:
			if e.message == " ":
				bug(e.message)
				bug("Failed to grab " + "'" + url + "'")
			else:
				bug("Failed to grab " + "'" + url + "'")
		

def proxylisty():
	print "Grabbing: http://www.proxylisty.com/"
	primary_url = "http://www.proxylisty.com/ip-proxylist-"
	urls = []
	for i in range(1, 68):
		urls.append(primary_url + str(i))

	for url in urls:
		try:
			bug("grabbing " + "'" + url + "'")
			opener = urllib2.build_opener()
			opener.addheaders = [('Host', 'www.proxylisty.com'),
								 ('Connection', 'keep-alive'),
								 ('Cache-Control', 'max-age=0'),
								 ('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'),
								 ('Upgrade-Insecure-Requests', '1'),
								 ('User-agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'),
								 ('Referer', 'https://www.google.co.za/'),
								 ('Accept-Encoding','gzip, deflate, sdch'),
								 ('Accept-Language','en-US,en;q=0.8')]

			response = opener.open(url, timeout=10)
			compressedFile = StringIO.StringIO()
			compressedFile.write(response.read())
			compressedFile.seek(0)
			decompessedFile = gzip.GzipFile(fileobj=compressedFile, mode='rb')
			html = decompessedFile.read()

			templs = re.findall(r'<tr>\n<td>(.*?)</td>', html)
			templs2 = re.findall(r'com/port/(.*?)-ip-list', html)

			for i in range(len(templs)):
				workerQueue.put(templs[i] + ":" + templs2[i])
				bug("proxylisty() " + templs[i] + ":" + templs2[i])

		except Exception, e:
			if e.message == " ":
				bug(e.message)
				bug("Failed to grab " + "'" + url + "'")
			else:
				bug("Failed to grab " + "'" + url + "'")

def nntime():
	print "Grabbing: http://nntime.com/"
	primary_url = "http://nntime.com/proxy-list-00.htm"
	urls = []
	for i in range(1, 31):
		if i < 10:
			urls.append(primary_url.replace("00", "0" + str(i)))
		else:
			urls.append(primary_url.replace("00", str(i)))

	for url in urls:
		try:
			response = urllib.urlopen(url)
			html = response.read()

			decoder_string = re.findall(r'<script type="text/javascript">\n(.*?)</script>', html)
			decoderls = decoder_string[0].split(";")

			temp_tuple = []
			for itm in decoderls:
				if itm:
					temp_tuple.append((itm.split("=")))

			decoder_dict = dict(temp_tuple)

			ips = re.findall(r'></td><td>(.*?)<script type="text/javascript">document', html)

			ports = []
			templs = re.findall(r'<script type="text/javascript">.*?</script>', html)
			for line in templs:
				temp = line.replace('<script type="text/javascript">document.write(":"+', '')
				temp = temp.replace(')</script>', '')
				codes = temp.split("+")

				temp_port = ""
				for code in codes:
					temp_port += decoder_dict[code]
				ports.append(temp_port)


			for i in range(len(ips)):
				#print ips[i] + ":" + ports[i]
				workerQueue.put(ips[i] + ":" + ports[i])

		except Exception, e:
			if e.message == " ":
				bug(e.message)
				bug("Failed to grab " + "'" + url + "'")
			else:
				bug("Failed to grab " + "'" + url + "'")

def aliveproxy():
	print "Grabbing: http://www.aliveproxy.com/"
	urls = [] 

	url = "http://www.aliveproxy.com/"
	response = urllib.urlopen(url)
	html = response.read()
	pos = html.find("Socks 5")
	html = html[:pos]

	temp_urls = re.findall(r'href=[\'"]?([^\'" >]+)', html)
	for itm in temp_urls:
		if "http://www.aliveproxy.com/proxy-list/proxies.aspx/" in itm:
			urls.append(itm)

	for url in urls:
		response = urllib.urlopen(url)
		html = response.read()
		templs = re.findall(r'(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})', html)
		for itm in templs:
			workerQueue.put(itm[0] + ":" + itm[1])


if __name__ == "__main__":
	print "#######################################"
	print "#######################################"
	print "###### Proxy Scraper Script V1.2 ######"
	print "## http://scrapeomatic.blogspot.com/ ##"
	print "#######################################"
	print "#######################################\n"
	print "Starting Proxy Scraper...\n"

	proxyCount = 0
	workerQueue = Queue.Queue()
	tQueueThread = threading.Thread(target=queueThread)
	tQueueThread.setDaemon(True)


	tProxylist = threading.Thread(target=proxylist)
	tProxylist.setDaemon(True)

	tUsproxy = threading.Thread(target=usproxy)
	tUsproxy.setDaemon(True)

	tFreeproxylist = threading.Thread(target=freeproxylist)
	tFreeproxylist.setDaemon(True)

	tCoolproxy = threading.Thread(target=coolproxy)
	tCoolproxy.setDaemon(True)

	tSamair = threading.Thread(target=samair)
	tSamair.setDaemon(True)
	
	tProxylisty = threading.Thread(target=proxylisty)
	tProxylisty.setDaemon(True)

	tNntime = threading.Thread(target=nntime)
	tNntime.setDaemon(True)

	tAliveproxy = threading.Thread(target=aliveproxy)
	tAliveproxy.setDaemon(True)

	tProxylist.start()
	time.sleep(.500)
	tUsproxy.start()
	time.sleep(.500)
	tFreeproxylist.start()
	time.sleep(.500)
	tCoolproxy.start()
	time.sleep(.500)
	tSamair.start()
	time.sleep(.500)
	tProxylisty.start()
	time.sleep(.500)
	tNntime.start()
	time.sleep(.500)
	tAliveproxy.start()

	time.sleep(2)
	print "\nPlease wait..."

	tProxylist.join()
	tUsproxy.join()
	tFreeproxylist.join()
	tCoolproxy.join()
	tSamair.join()
	tProxylisty.join()
	tNntime.join()
	tAliveproxy.join()

	if not workerQueue.empty():
		tQueueThread.start()
		tQueueThread.join()
		print "Saved to file!\n"
		print "Proxies found: " + str(proxyCount)
	else:
		print "Could not scrape any proxies!"


	#raw_input("\nPress any key to exit...")
	sys.exit()

print "Done"
