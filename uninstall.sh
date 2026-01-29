#!/bin/bash
# ulk - Uninstall Script

set -e

CLAUDE_COMMANDS="$HOME/.claude/commands"
ULK_TARGET="$CLAUDE_COMMANDS/ulk"
# Also clean up old woodman/wm installations
WOODMAN_TARGET="$CLAUDE_COMMANDS/woodman"
WM_TARGET="$CLAUDE_COMMANDS/wm"

echo ""
echo "⚡ ulk Uninstaller"
echo "=================="
echo ""

removed=0

# Supprimer ulk
if [ -L "$ULK_TARGET" ] || [ -e "$ULK_TARGET" ]; then
    rm -rf "$ULK_TARGET"
    echo "   ✅ /ulk supprimé"
    removed=$((removed + 1))
fi

# Supprimer anciennes installations woodman
if [ -L "$WOODMAN_TARGET" ] || [ -e "$WOODMAN_TARGET" ]; then
    rm -rf "$WOODMAN_TARGET"
    echo "   ✅ /woodman supprimé (ancienne version)"
    removed=$((removed + 1))
fi

# Supprimer anciennes installations wm
if [ -L "$WM_TARGET" ] || [ -e "$WM_TARGET" ]; then
    rm -rf "$WM_TARGET"
    echo "   ✅ /wm supprimé (ancienne version)"
    removed=$((removed + 1))
fi

echo ""

if [ $removed -gt 0 ]; then
    echo "✅ Désinstallation réussie!"
else
    echo "ℹ️  ulk n'était pas installé"
fi

echo ""
