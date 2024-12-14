# Codecompanion

<https://github.com/olimorris/codecompanion.nvim>

Usa adaptadores para conectar con las distintas LLMs.

Para copilot, si usamos zbirenbaum/copilot podemos obtener el token en ~/.config/github-copilot/hosts.json
Parece que no es necesario configurar el token. Creo que lo coge solo: <https://github.com/olimorris/codecompanion.nvim/issues/189>

Distintos tipos de uso:

- chat
- inline
- agent
- workflow

Cada tipo puede usar distintos adaptadores.

Cambiar el adapter del chat: ga

Cuando estamos en la ventana del chat, usar control+s para enviar el mensaje (si estamos en modo edición), enter si estamos en modo movernos.

You can add context from your code base by using _Variables_ and _Slash Commands_ in the chat buffer.

_Variables_, accessed via `#`, contain data about the present state of Neovim:

- `#buffer` - Shares the current buffer's code. You can also specify line numbers with `#buffer:8-20`
- `#lsp` - Shares LSP information and code for the current buffer
- `#viewport` - Shares the buffers and lines that you see in the Neovim viewport

_Slash commands_, accessed via `/`, run commands to insert additional context into the chat buffer:

- `/buffer` - Insert open buffers
- `/fetch` - Insert URL contents
- `/file` - Insert a file
- `/help` - Insert content from help tags
- `/now` - Insert the current date and time
- `/symbols` - Insert symbols from a selected file
- `/terminal` - Insert terminal output

_Tools_, accessed via `@`, allow the LLM to function as an agent and carry out actions:

- `@cmd_runner` - The LLM will run shell commands (subject to approval)
- `@editor` - The LLM will edit code in a Neovim buffer
- `@files` - The LLM will can work with files on the file system (subject to approval)
- `@rag` - The LLM will browse and search the internet for real-time information to supplement its response

Tools can also be grouped together to form _Agents_, which are also accessed via `@` in the chat buffer:

- `@full_stack_dev` - Contains the `cmd_runner`, `editor` and `files` tools.

## Configuración

Ejemplo:

```vim
return {
  "olimorris/codecompanion.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-treesitter/nvim-treesitter",
    "hrsh7th/nvim-cmp", -- Optional: For using slash commands and variables in the chat buffer
    "nvim-telescope/telescope.nvim", -- Optional: For using slash commands
    { "MeanderingProgrammer/render-markdown.nvim", ft = { "markdown", "codecompanion" } }, -- Optional: For prettier markdown rendering
    { "stevearc/dressing.nvim", opts = {} }, -- Optional: Improves `vim.ui.select`
  },
  config = true,
  opts = {
    strategies = {
      chat = { adapter = "copilot" },
      inline = { adapter = "copilot" },
      agent = { adapter = "copilot" },
    },
    opts = {
      log_level = "DEBUG",
    },
    adapters = {
      copilot = function()
        return require("codecompanion.adapters").extend("copilot", {
          schema = {
            model = {
              default = "o1-preview-2024-09-12",
            },
          },
        })
      end,
    },
  },
}
```

## Log

/home/adrian/.local/state/nvim/codecompanion.log

# Avante

<https://github.com/yetone/avante.nvim>

Plugin para interactuar con LLMs desde nvim

Para configurar las API keys:
export ANTHROPIC_API_KEY=your-api-key
export OPENAI_API_KEY=your-api-key
export AZURE_OPENAI_API_KEY=your-api-key

<https://github.com/yetone/avante.nvim?tab=readme-ov-file#key-bindings>

:AvanteChat
Para abrir un split con el chat de Avante

Si me muevo a la ventana de la respuesta, puedo hacer "apply" sobre los diferentes bloques.

No me está funcionando del todo bien.

# Copilot oficial

El oficial: <https://github.com/github/copilot.vim>

# zbirenbaum/copilot

Implementación no oficial en lua: <https://github.com/zbirenbaum/copilot.lua>

Guarda los datos (entre ellos el token) en ~/.config/github-copilot

# CopilotChat

<https://github.com/CopilotC-Nvim/CopilotChat.nvim?tab=readme-ov-file>
