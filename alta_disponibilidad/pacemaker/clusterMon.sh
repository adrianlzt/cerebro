#!/bin/bash

# Author: Florian CROUZAT <gentoo@floriancrouzat.net>
# Date: 02-07-2013
# v0.3

# Resources:
#  crm ra meta ocf:pacemaker:ClusterMon
#  man 8 crm_mon

# Sample configuration
# ================================
# primitive ClusterMon ocf:pacemaker:ClusterMon \
#        params user="root" update="30" extra_options="-E /usr/local/bin/clusterMon.sh -e 192.168.1.2" \
#        op monitor on-fail="restart" interval="10"
#
# clone ClusterMon-clone ClusterMon \
#        meta target-role="Started"
# ================================

# The external agent is fed with environment variables allowing us to know
# what transition happened and to react accordingly:
#  http://clusterlabs.org/doc/en-US/Pacemaker/1.1-crmsh/html/Pacemaker_Explained/s-notification-external.html

# Generates SNMP alerts for any failing monitor operation
#  OR
# for any operations (even successful) that are not a monitor
#if [[ ${CRM_notify_rc} != 0 && ${CRM_notify_task} == "monitor" ]] || [[ ${CRM_notify_task} != "monitor" ]] ; then
    # This trap is compliant with PACEMAKER MIB
    #  https://github.com/ClusterLabs/pacemaker/blob/master/extra/PCMK-MIB.txt
#    /usr/bin/snmptrap -v 2c -c public ${CRM_notify_recipient} "" PACEMAKER-MIB::pacemakerNotification \
#	PACEMAKER-MIB::pacemakerNotificationNode s "${CRM_notify_node}" \
#	PACEMAKER-MIB::pacemakerNotificationResource s "${CRM_notify_rsc}" \
#	PACEMAKER-MIB::pacemakerNotificationOperation s "${CRM_notify_task}" \
#	PACEMAKER-MIB::pacemakerNotificationDescription s "${CRM_notify_desc}" \
#	PACEMAKER-MIB::pacemakerNotificationStatus i "${CRM_notify_status}" \
#	PACEMAKER-MIB::pacemakerNotificationReturnCode i ${CRM_notify_rc} \
#	PACEMAKER-MIB::pacemakerNotificationTargetReturnCode i ${CRM_notify_target_rc} && exit 0 || exit 1
#fi

#echo ${CRM_notify_rc} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_task} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_recipient} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_node} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_rsc} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_desc} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_status} >> /tmp/LOG-pacemaker
#echo ${CRM_notify_target_rc} >> /tmp/LOG-pacemaker

if [[ ${CRM_notify_rc} != 0 && ${CRM_notify_task} == "monitor" ]] || [[ ${CRM_notify_task} != "monitor" ]] ; then
	DATE=$(date --rfc-3339='ns')
	HOSTNAME=$(hostname)
	SUBJECT="[Pacemaker][nagiosmaster] Cambio en el cluster - $HOSTNAME"
	TO='mail@tasd.com'
	CC='ort14@id.s'
	echo -e "Se ha producido un cambio en el estado del cluster\nReturn Code =  ${CRM_notify_rc}\nTask = ${CRM_notify_task}\nNode =  ${CRM_notify_node}\n RSC = ${CRM_notify_rsc}\nDesc = ${CRM_notify_desc}\nStatus = ${CRM_notify_status}\nTarget RC = ${CRM_notify_target_rc}\nDate = $DATE" | mail -s "$SUBJECT" -c $CC -E $TO
fi

exit 0

