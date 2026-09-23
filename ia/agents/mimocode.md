https://github.com/XiaomiMiMo/MiMo-Code

MiMoCode is built as a fork of OpenCode. It keeps all core OpenCode capabilities (multiple providers, TUI, LSP, MCP, plugins) and adds persistent memory, intelligent context management, subagent orchestration, goal-driven autonomous loops, compose workflows, and self-improvement via dream/distill.

Config en ~/.config/mimocode/


# Persistent Memory System

OpenCode: Relies primarily on active in-context memory during an active chat session.

MiMo-Code: Introduces a multi-tiered, persistent memory system backed by SQLite FTS5:
  Project Memory (MEMORY.md): Stores long-term project conventions and architecture decisions.
  Session Checkpoints (checkpoint.md): Maintained automatically in the background by a dedicated checkpoint-writer subagent to snapshot session state.
  Scratch Notes (notes.md) & Task Progress: Tracks task execution logs per subtask.
  Memory Compaction / Distillation: Features automated background cleanups (every 7 days) to deduplicate, compress, and converge scattered project memories into a clean state.

# Context Management & Budgeting
OpenCode: Manages context using default compaction once the model's token limit is approached.

MiMo-Code: Features Intelligent Context Management with custom token budgeting:
  Context Reconstruction: Rebuilds the context window from the latest checkpoint, project memory, and recent key messages when context reaches budget limits.
  Manual Limits (/context-limit): Allows setting lower working context budgets (e.g., 200K, 300K, or custom limits via compaction.max_context) per model to optimize for cost tiers, latency, and response quality.

# Agent Modes & Orchestration
OpenCode: Standard single-agent assistant workflow with conversational tool execution.

MiMo-Code: Introduces isolated primary agent modes and subagent workflows:
  build: Default mode with full tool permissions for active development.
  plan: Read-only analysis mode for code exploration and architecture design.
  compose: Orchestration mode for specification-driven development and skill-driven workflows.
  Subagent Orchestration: Spawns specialized background agents (e.g., checkpoint writers, goal-driven loops) without cluttering the primary conversational loop.

# Task Tracking System
OpenCode: Handles tasks sequentially within the ongoing conversation stream.

MiMo-Code: Incorporates a tree-structured task system (T1, T1.1, T1.2, etc.). Task trees integrate directly into the checkpoint system so task progress is preserved across session restarts or context resets.
