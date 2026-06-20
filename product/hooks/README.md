# Hook Recipes

Drop the relevant block into your `.claude/settings.json` (or `settings.local.json` for personal-only hooks) under `"hooks"`. Each one solves a specific annoyance — copy only what you need.

## 1. Auto-format on file write

Runs your formatter automatically after Claude edits a file, so you never review unformatted diffs.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool": "Edit" },
        "command": "npx prettier --write \"$CLAUDE_TOOL_FILE_PATH\" 2>/dev/null || true"
      }
    ]
  }
}
```

Swap the command for `black "$CLAUDE_TOOL_FILE_PATH"`, `gofmt -w`, etc. The `|| true` keeps a missing formatter from blocking the edit.

## 2. Block edits to protected paths

Stops Claude from ever touching generated files, lockfiles, or CI config without you explicitly allowing it that session.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool": "Edit", "pathPattern": "(package-lock\\.json|\\.github/workflows/.*)" },
        "command": "echo 'Blocked: protected path. Ask the user before editing CI or lockfiles.' >&2; exit 1"
      }
    ]
  }
}
```

## 3. Desktop notification when Claude needs you

Useful for long-running tasks — fires a system notification the moment Claude is blocked on a permission prompt or finishes.

```json
{
  "hooks": {
    "Notification": [
      { "command": "notify-send 'Claude Code' \"$CLAUDE_NOTIFICATION_MESSAGE\"" }
    ],
    "Stop": [
      { "command": "notify-send 'Claude Code' 'Task finished'" }
    ]
  }
}
```

(On macOS, swap `notify-send` for `osascript -e 'display notification \"'$CLAUDE_NOTIFICATION_MESSAGE'\" with title \"Claude Code\"'`. On Windows, use `powershell -c "New-BurntToastNotification -Text 'Claude Code', '$env:CLAUDE_NOTIFICATION_MESSAGE'"` if BurntToast is installed, or a simple `msg %username%` fallback.)

## 4. Run tests automatically before commit-related tool calls

Catches a broken commit before it happens instead of after.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool": "Bash", "commandPattern": "git commit" },
        "command": "npm test --silent || (echo 'Tests failing — fix before committing.' >&2; exit 1)"
      }
    ]
  }
}
```

## 5. Log every bash command Claude runs to a session audit file

For teams that want an audit trail of what an agent actually executed.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool": "Bash" },
        "command": "echo \"$(date -u +%FT%TZ) $CLAUDE_TOOL_COMMAND\" >> .claude/audit.log"
      }
    ]
  }
}
```

**Note:** exact environment variable names and hook event names can shift between Claude Code versions — if a hook doesn't fire, run `claude doctor` or check the current hooks reference in the in-app docs (`/help`) and adjust the matcher/event name accordingly. These recipes are the *patterns*; treat the exact field names as a starting point to verify against your installed version.
