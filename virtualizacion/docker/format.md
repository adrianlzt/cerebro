```bash
docker ps --format "{{.ID}}: {{.Image}}: {{.Command}}: {{.CreatedAt}}: {{.RunningFor}}: {{.Ports}}: {{.Status}}: {{.Size}}: {{.Names}}"
```
