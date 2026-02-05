<https://github.com/oug-t/difi>

Review and refine Git diffs before you push

Install:

```bash
go install github.com/oug-t/difi/cmd/difi@latest
```

Usar con nvim:
<https://github.com/oug-t/difi.nvim>

En vez de usar

```bash
git diff
```

Usar

```bash
difi
```

Si queremos editar un diff, saltar con "e" a neovim.

En el editor, modificar como queramos y terminar con ":Difi" (no guardar directamente).

| Action | How to do it | Result |
| :--- | :--- | :--- |
| **Accept Addition** | Do nothing | The `+` marker is stripped, keeping the green line. |
| **Reject Addition** | Delete the line (`dd`) | The new code is removed completely. |
| **Confirm Deletion** | Do nothing | The red line (starting with `-`) disappears. |
| **Restore Deletion** | Delete the `-` marker | The text is kept and the line becomes normal code. |
| **Fix a Typo** | Edit the text directly | Your changes are saved as the new version. |
