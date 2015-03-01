/* multi-client-echo-server.c - a multi-client echo server */
/* Copyrights - Guy Keren 1999 (c) 			   */

#include <stdio.h>		/* Basic I/O routines 		*/
#include <sys/types.h>		/* standard system types 	*/
#include <netinet/in.h>		/* Internet address structures 	*/
#include <sys/socket.h>		/* socket interface functions 	*/
#include <netdb.h>		/* host to IP resolution 	*/
#include <sys/time.h>		/* for timeout values 		*/
#include <unistd.h>		/* for table size calculations 	*/

#define	PORT		5060	/* port of our echo server */
#define	BUFLEN		1024	/* buffer length 	   */

void main()
{
    int			i;		/* index counter for loop operations */
    int			rc; 		/* system calls return value storage */
    int			s; 		/* socket descriptor */
    int			cs; 		/* new connection's socket descriptor */
    char		buf[BUFLEN+1];  /* buffer for incoming data */
    struct sockaddr_in	sa; 		/* Internet address struct */
    struct sockaddr_in	csa; 		/* client's address struct */
    int         	size_csa; 	/* size of client's address struct */
    fd_set		rfd; 		/* set of open sockets */
    fd_set		c_rfd; 		/* set of sockets waiting to be read */
    int			dsize; 		/* size of file descriptors table */

    /* initiate machine's Internet address structure */
    /* first clear out the struct, to avoid garbage  */
    memset(&sa, 0, sizeof(sa));
    /* Using Internet address family */
    sa.sin_family = AF_INET;
    /* copy port number in network byte order */
    sa.sin_port = htons(PORT);
    /* we will accept cnnections coming through any IP	*/
    /* address that belongs to our host, using the	*/
    /* INADDR_ANY wild-card.				*/
    sa.sin_addr.s_addr = INADDR_ANY;

    /* allocate a free socket                 */
    /* Internet address family, Stream socket */
    s = socket(AF_INET, SOCK_STREAM, 0);
    if (s < 0) {
	perror("socket: allocation failed");
    }

    /* bind the socket to the newly formed address */
    rc = bind(s, (struct sockaddr *)&sa, sizeof(sa));

    /* check there was no error */
    if (rc) {
	perror("bind");
    }

    /* ask the system to listen for incoming connections	*/
    /* to the address we just bound. specify that up to		*/
    /* 5 pending connection requests will be queued by the	*/
    /* system, if we are not directly awaiting them using	*/
    /* the accept() system call, when they arrive.		*/
    rc = listen(s, 5);

    /* check there was no error */
    if (rc) {
	perror("listen");
    }

    /* remember size for later usage */
    size_csa = sizeof(csa);

    /* calculate size of file descriptors table */
    dsize = getdtablesize();

    /* close all file descriptors, except our communication socket	*/
    /* this is done to avoid blocking on tty operations and such.	*/
    for (i=0; i<dsize; i++)
	if (i != s)
	    close(i);

    /* we innitialy have only one socket open,	*/
    /* to receive new incoming connections.	*/
    FD_ZERO(&rfd);
    FD_SET(s, &rfd);
    /* enter an accept-write-close infinite loop */
    while (1) {
	/* the select() system call waits until any of	*/
	/* the file descriptors specified in the read,	*/
	/* write and exception sets given to it, is	*/
	/* ready to give data, send data, or is in an 	*/
	/* exceptional state, in respect. the call will	*/
	/* wait for a given time before returning. in	*/
	/* this case, the value is NULL, so it will	*/
	/* not timeout. dsize specifies the size of the	*/
	/* file descriptor table.			*/
	c_rfd = rfd;
	rc = select(dsize, &c_rfd, NULL, NULL, (struct timeval *)NULL);

	/* if the 's' socket is ready for reading, it	*/
	/* means that a new connection request arrived.	*/
	if (FD_ISSET(s, &c_rfd)) {
	    /* accept the incoming connection */
       	    cs = accept(s, (struct sockaddr *)&csa, &size_csa);

       	    /* check for errors. if any, ignore new connection */
       	    if (cs < 0)
       		continue;

	    /* add the new socket to the set of open sockets */
	    FD_SET(cs, &rfd);

	    /* and loop again */
	    continue;
	}

	/* check which sockets are ready for reading,	*/
	/* and handle them with care.			*/
	for (i=0; i<dsize; i++)
	    if (i != s && FD_ISSET(i, &c_rfd)) {
	    /* read from the socket */
	    rc = read(i, buf, BUFLEN);

	    /* if client closed the connection... */
	    if (rc == 0) {
		/* close the socket */
		close(i);
	        FD_CLR(i, &rfd);
	    }
	    /* if there was data to read */
	    else {
		/* echo it back to the client */
		write(i, buf, rc);
	    }
	}
    }
}
