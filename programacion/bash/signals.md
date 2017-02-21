on_die()
{
	echo "Dying..."
	# do cleanup here as necesary #
	# and then exit!
	exit 0
}
 
# register on_die on SIGTERM signal
trap 'on_die' SIGTERM
