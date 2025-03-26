# Code Insiders

## VSCode Insiders

I just remembered seeing there's [VSCode Insiders](https://code.visualstudio.com/insiders/), a daily build. Pleasing is :
<blockquote>
  Insiders installs next to the Stable build, allowing you to use either independently.
</blockquote>

Hmm. **apt upgrade** saw a newer kernel for me, but is segfaulting on something to do with the NVIDIA drivers. I've only got a really rubbish old GPU in this machine. I'm also still on Ubuntu 24.04, need to upgrade soon.

Yay, it didn't segfault on a second run. Lets see what happens on reboot...**no problem**, good-o.

Running `code-insiders` brings it up. Yes, independent of the stable instance. Ok, this is nice. I can use Copilot of this one, other AI bits on the other.

btw I'm using [pulsar-edit](https://pulsar-edit.dev/) (formerly Atom) for these docs. Similar tool, different theme, different purpose.

## Claude Inside

#:danbri pointed me towards [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)

CLI, cool.

│ Select memory to edit:                                                                                                                                                                     │
│                                                                                                                                                                                            │
│  ❯ Project memory                 Checked in at ./CLAUDE.md                                                                                                                                │
│    Project memory (local)         Gitignored in ./CLAUDE.local.md                                                                                                                          │
│    User memory                    Saved in ~/.claude/CLAUDE.md                                                                                                                             │
│                                                                                                                                                                                            │
│ 16 memories in ./CLAUDE.md  


claude config add ignorePatterns node_modules

claude config add ignorePatterns "node_modules/**"
claude config add ignorePatterns "**/_*/**"
claude config add ignorePatterns "**/_*/**"

> /cost
  ⎿  Total cost:            $3.37
  ⎿  Total duration (API):  11m 55.1s
  ⎿  Total duration (wall): 1h 8m 50.1s
  ⎿  Total code changes:    1164 lines added, 68 lines removed
