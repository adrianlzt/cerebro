https://github.com/googleworkspace/cli

Google Workspace CLI — one command-line tool for Drive, Gmail, Calendar, Sheets, Docs, Chat, Admin, and more. Dynamically built from Google Discovery Service. Includes AI agent skills.

```bash
pacman -S googleworkspace-cli
```

Auth flow
```bash
gws auth setup
```

Prueba:
```bash
gws drive files list --params '{"pageSize": 5}'
```

# Skills

```bash
npx skills add https://github.com/googleworkspace/cli
```
