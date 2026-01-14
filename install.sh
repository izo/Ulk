#!/bin/bash
# Woodman Agents - Installation Script
# Installe les agents comme Custom Commands dans Claude Code

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMANDS_SOURCE="$SCRIPT_DIR/commands"
CLAUDE_COMMANDS="$HOME/.claude/commands"
WOODMAN_TARGET="$CLAUDE_COMMANDS/woodman"

echo "🪵 Woodman Agents Installer"
echo "==========================="
echo ""

# Vérifier que le dossier commands existe
if [ ! -d "$COMMANDS_SOURCE" ]; then
    echo "❌ Erreur: Dossier commands/ non trouvé"
    echo "   Chemin attendu: $COMMANDS_SOURCE"
    exit 1
fi

# Créer le dossier .claude/commands s'il n'existe pas
if [ ! -d "$CLAUDE_COMMANDS" ]; then
    echo "📁 Création de $CLAUDE_COMMANDS"
    mkdir -p "$CLAUDE_COMMANDS"
fi

# Vérifier si woodman existe déjà
if [ -e "$WOODMAN_TARGET" ]; then
    if [ -L "$WOODMAN_TARGET" ]; then
        echo "🔗 Symlink existant détecté, mise à jour..."
        rm "$WOODMAN_TARGET"
    else
        echo "⚠️  Un dossier woodman existe déjà (pas un symlink)"
        echo "   $WOODMAN_TARGET"
        echo ""
        read -p "   Voulez-vous le remplacer ? [y/N] " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ Installation annulée"
            exit 1
        fi
        rm -rf "$WOODMAN_TARGET"
    fi
fi

# Créer le symlink
echo "🔗 Création du symlink..."
ln -s "$COMMANDS_SOURCE" "$WOODMAN_TARGET"

echo ""
echo "✅ Installation réussie!"
echo ""
echo "📍 Source:  $COMMANDS_SOURCE"
echo "📍 Target:  $WOODMAN_TARGET"
echo ""
echo "🚀 Agents disponibles:"
echo ""

# Lister les agents
for dir in agents analyze; do
    if [ -d "$COMMANDS_SOURCE/$dir" ]; then
        echo "   /woodman:$dir:"
        for file in "$COMMANDS_SOURCE/$dir"/*.md; do
            if [ -f "$file" ]; then
                name=$(basename "$file" .md)
                echo "     - /woodman:$dir:$name"
            fi
        done
        echo ""
    fi
done

echo "💡 Usage: Tapez /woodman:agents:spec-writer dans Claude Code"
echo ""
