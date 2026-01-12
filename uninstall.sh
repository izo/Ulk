#!/bin/bash
# Woodman Agents - Uninstall Script

set -e

WOODMAN_TARGET="$HOME/.claude/commands/woodman"

echo "🪵 Woodman Agents Uninstaller"
echo "============================="
echo ""

if [ -L "$WOODMAN_TARGET" ]; then
    echo "🔗 Suppression du symlink..."
    rm "$WOODMAN_TARGET"
    echo "✅ Désinstallation réussie!"
elif [ -d "$WOODMAN_TARGET" ]; then
    echo "📁 Dossier détecté (pas un symlink)"
    read -p "   Voulez-vous le supprimer ? [y/N] " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$WOODMAN_TARGET"
        echo "✅ Dossier supprimé"
    else
        echo "❌ Désinstallation annulée"
        exit 1
    fi
else
    echo "ℹ️  Woodman n'est pas installé"
fi

echo ""
