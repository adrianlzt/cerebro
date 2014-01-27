Teoría: http://advogato.org/person/lmb/diary/108.html

http://clusterlabs.org/doc/en-US/Pacemaker/1.0/html/Pacemaker_Explained/s-operation-defaults.html#id525162

primitive splunk_VP05P lsb:splunk \
        op monitor interval="20s" \
        op start interval="0" timeout="2min" \
        op stop interval="0" timeout="1min" \
        meta target-role="Started" is-managed="true"

