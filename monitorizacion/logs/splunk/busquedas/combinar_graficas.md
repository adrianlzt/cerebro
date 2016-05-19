https://answers.splunk.com/answers/79080/results-of-two-searches-displayed-on-one-chart.html

index=A product=inA | stats count(UniqueID) as Requests | appendcols [search index=B order="BuyProduct" | stats count(UniqueID) as OrdersPlaced] 

index=indice | timechart eval(sum(REQTIME)/1000000) as req_time | appendcols [search index=indice uri="/check_mk/" | timechart eval(sum(REQTIME)/1000000) as typ_req_time]
