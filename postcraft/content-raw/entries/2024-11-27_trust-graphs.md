# Trust Graphs!

*I had a server issue - overshooting mem & cpu limits. I'd forgotten I'd left [TrustGraph](https://trustgraph.ai/) running. #:ops*

Problem identified with :

```sh
free -m
ps -eo pmem,pcpu,rss,vsize,args | sort -k 1 -r | less
```
https://techdocs.akamai.com/cloud-computing/docs/troubleshooting-memory-issues-on-compute-instances

Fixed with :
```sh
cd /home/services/trustgraph/docker-compose/
docker compose -f danja-tg-openai-neo4j.yaml down -v
docker ps
```
https://trustgraph.ai/docs/running/docker

#:ops #2 - it was also running on my office machine

```sh
cd ~/AI/trustgraph/deploy/docker-compose
docker compose -f tg-ollama-neo4j.yaml down -v # maybe
