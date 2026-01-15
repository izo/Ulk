#!/bin/bash
# Woodman - Uninstall Script

set -e

CLAUDE_COMMANDS="$HOME/.claude/commands"
WOODMAN_TARGET="$CLAUDE_COMMANDS/woodman"
WM_TARGET="$CLAUDE_COMMANDS/wm"

echo ""
echo "🪵 Woodman Uninstaller"
echo "======================"
echo ""

removed=0

# Supprimer woodman
if [ -L "$WOODMAN_TARGET" ] || [ -e "$WOODMAN_TARGET" ]; then
    rm -rf "$WOODMAN_TARGET"
    echo "   ✅ /woodman supprimé"
    removed=$((removed + 1))
fi

# Supprimer wm (alias)
if [ -L "$WM_TARGET" ] || [ -e "$WM_TARGET" ]; then
    rm -rf "$WM_TARGET"
    echo "   ✅ /wm supprimé"
    removed=$((removed + 1))
fi

echo ""

if [ $removed -gt 0 ]; then
    echo "✅ Désinstallation réussie!"
else
    echo "ℹ️  Woodman n'était pas installé"
fi

echo ""
