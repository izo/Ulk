---
title: "Boris Bible"
author: "Boris Cherny"
handle: "@boris_cherny"
description: "How Boris Cherny, creator of Claude Code, uses Claude Code"
date: 2025-01-04
tags:
  - Claude Code
  - AI
  - Development
  - Workflow
  - Best Practices
---

# Boris Bible

**@boris_cherny**

I'm Boris and I created Claude Code. Lots of people have asked how I use Claude Code, so I wanted to show off my setup a bit.

My setup might be surprisingly vanilla! Claude Code works great out of the box, so I personally don't customize it much. There is no one correct way to use Claude Code: we intentionally build it in a way that you can use it, customize it, and hack it however you like. Each person on the Claude Code team uses it very differently.

So, here goes.

![Boris Bible Cover](Boris%20Bible1.jpeg)

---

## 1/ Parallel Terminal Sessions

I run 5 Claudes in parallel in my terminal. I number my tabs 1-5, and use system notifications to know when a Claude needs input.

> [code.claude.com/docs](https://code.claude.com/docs)

![Terminal Setup](Boris%20Bible2.jpeg)

---

## 2/ Web & Mobile Sessions

I also run 5-10 Claudes on claude.ai/code, in parallel with my local Claudes. As I code in my terminal, I will often hand off local sessions to web (using `&`), or manually kick off sessions in Chrome, and sometimes I will `--teleport` back and forth. I also start a few sessions from my phone (from the Claude iOS app) every morning and throughout the day, and check in on them later.

---

## 3/ Opus 4.5 with Thinking

I use Opus 4.5 with thinking for everything. It's the best coding model I've ever used, and even though it's bigger & slower than Sonnet, since you have to steer it less and it's better at tool use, it is almost always faster than using a smaller model in the end.

---

## 4/ Shared CLAUDE.md

Our team shares a single CLAUDE.md for the Claude Code repo. We check it into git, and the whole team contributes multiple times a week. Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time.

Other teams maintain their own CLAUDE.md's. It is each team's job to keep theirs up to date.

![CLAUDE.md Setup](Boris%20Bible4.jpeg)

---

## 5/ Code Review Integration

During code review, I will often tag `@.claude` on my coworkers' PRs to add something to the CLAUDE.md as part of the PR. We use the Claude Code Github action (`/install-github-action`) for this. It's our version of @danshipper's Compounding Engineering.

![Code Review](Boris%20Bible5.jpeg)

---

## 6/ Plan Mode

Most sessions start in Plan mode (`shift+tab` twice). If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan. From there, I switch into auto-accept edits mode and Claude can usually 1-shot it. A good plan is really important!

![Plan Mode](Boris%20Bible6.jpeg)

---

## 7/ Slash Commands

I use slash commands for every inner loop workflow that I do many times a day. This saves me from repeated prompting, and makes it so Claude can use these workflows, too. Commands are checked into git and live in `.claude/commands/`.

**Example:** Claude and I use a `/commit-push-pr` slash command every day. The command uses inline bash to pre-compute git status to make the command run quickly and avoid back-and-forth with the model.

> [code.claude.com/docs](https://code.claude.com/docs)

![Slash Commands](Boris%20Bible7.jpeg)

---

## 8/ Subagents

I use a few subagents regularly:
- **code-simplifier** - simplifies the code after Claude is done working
- **verify-app** - has detailed instructions for testing Claude Code end to end
- And more...

Similar to slash commands, I think of subagents as automating the most common workflows that I do for most PRs.

![Subagents](Boris%20Bible8.jpeg)

---

## 9/ PostToolUse Hook for Formatting

We use a PostToolUse hook to format Claude's code. Claude usually generates well-formatted code out of the box, and the hook handles the last 10% to avoid formatting errors in CI later.

![Hooks](Boris%20Bible9.jpeg)

---

## 10/ Permissions Management

I don't use `--dangerously-skip-permissions`. Instead, I use `/permissions` to pre-allow common bash commands that I know are safe in my environment, to avoid unnecessary permission prompts. Most of these are checked into `.claude/settings.json` and shared with the team.

![Permissions](Boris%20Bible10.jpeg)

---

## 11/ Tool Integration

Claude Code uses all my tools for me. It often:
- Searches and posts to Slack (via the MCP server)
- Runs BigQuery queries to answer analytics questions (using bq CLI)
- Grabs error logs from Sentry
- etc.

The Slack MCP configuration is checked into our `.mcp.json` and shared with the team.

![Tool Integration](Boris%20Bible11.jpeg)

---

## 12/ Long-Running Tasks

For very long-running tasks, I will either:
- Prompt Claude to verify its work with a background agent when it's done
- Use an agent Stop hook to do that more deterministically
- Use the ralph-wiggum plugin

I will also use either `--permission-mode=dontAsk` or `--dangerously-skip-permissions` in a sandbox to avoid permission prompts for the session, so Claude isn't blocked on me.

![Long-Running Tasks](Boris%20Bible12.jpeg)

---

## 13/ Verification Loop

**A final tip:** probably the most important thing to get great results out of Claude Code -- give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result.

Claude tests every change I land to claude.ai/code using the Chrome extension. It opens a browser, tests the UI, and iterates until the code works.

> [code.claude.com/docs](https://code.claude.com/docs)
