Cosas con las que tener cuidado al desarrollar un arnés: https://x.com/mfpiccolo/status/2102089734004593140/photo/1

* crash mid tool call left a dangling call with no result that poisoned every later request
* resumed turn raced the worker booting and called a function that wasn't registered yet
* no durable queue for turns so wedged ones sat in running forever
* cut stream parsed as null args and got reported as a successful empty turn
* seven providers treating any connection close as done
* cached tokens double billed on six providers
* file reads counted twice so we saw phantom context overflow
* retry budget of 1 killing turns one step from done
* compaction returning an empty context
* child agent death silent by construction
* lock order deadlock between parent retasking a child and the child finishing
* ci only dodged the deadlock by scheduling luck
* stop button clobbered by a stale write from the step it was stopping
* one 18mb directory listing wedging the whole agent runtime through restarts
* poison message reflushed on every reconnect
* queue faithfully redelivering the poison
* wake notifications cutting json at 600 chars, mid array
* 10mb session log replayed synchronously under a mutex
* approval hook registered 171 times because the instance count lagged
* resuming past only the first duplicate hook, held forever
* failure cleanup timing out and logging skipped, same as a no op
* a span emitted per token plus a persisted state write per event
* 41% more tokens, 95% of it repeated context cache reads
* large tool calls ending with incomplete args, then re emitted
* registrations lost when the runtime reloaded a different worker
* agent uninstallable because its dependency graph had 65 edges and the limit was 64
* websocket reset loop every 2.8 seconds
* stop command vanished because registrations weren't replayed after reconnect
* startup sweep rerunning the same doomed call after every boot
* parent parked forever waiting on a child that died out of band
* two parallel approvals both waking one turn, shell command executed twice
* provider stream stalled mid delta, keepalive pings counted as activity
* 120s idle guard that never fired, 300s hard kill with an opaque error
* no read timeout on upstream clients
* agent restarting the very process hosting its own turn
* "confirm before restarting" in the prompt, not a guarantee
* generated code polling state 140 times a second, 29.7k spans in one trace
* trace cache eviction went quadratic under a lock every thread needed, kill -9
* null serialized as "no result", sdk saw undefined, infinite loop
* 16 compactions, then a 5m char hook result, "compaction succeeded"
* five sub agents hitting the turn limit, all reporting completed
* two ids that differed by one character colliding, second message silently dropped
* malformed deny rule failing open
* unknown model fell to an 8k window, sub agents had about 6k usable
* first turn system prompt 14 tokens different, second cache write every session
* 79% of tool schema tokens were prose
* any result under 2000 chars immortal in context, 63k to 76k token floor
* no completion trigger so agents used sleep 60 as a wait primitive
* 48% of root turns were status polls
* sub agents not inheriting reasoning effort, 32 min to 18 min, $1.16 to $0.50, same score
* two components each persisting a registration token, desync no restart could fix
* two runtimes on one port, function ownership flapping, oom sigkill
* 761mb of traces at 20mb a minute in a quiet session
