#!/bin/bash
# Woodman - Installation Script
#
# Installation locale (symlink):
#   ./install.sh
#
# Installation globale (copie):
#   ./install.sh --global
#
# Installation one-liner depuis GitHub:
#   curl -fsSL https://raw.githubusercontent.com/izo/Woodman/main/install-remote.sh | bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMANDS_SOURCE="$SCRIPT_DIR/commands"
CLAUDE_COMMANDS="$HOME/.claude/commands"
WOODMAN_DIR="$CLAUDE_COMMANDS/woodman"
WM_DIR="$CLAUDE_COMMANDS/wm"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

MODE="symlink"
if [[ "$1" == "--global" ]] || [[ "$1" == "-g" ]]; then
    MODE="copy"
fi

echo ""
echo -e "${GREEN}🪵 Woodman Installer${NC}"
echo "===================="
echo ""

# Vérifier que le dossier commands existe
if [ ! -d "$COMMANDS_SOURCE" ]; then
    echo -e "${RED}❌ Erreur: Dossier commands/ non trouvé${NC}"
    exit 1
fi

# Créer le dossier .claude/commands s'il n'existe pas
mkdir -p "$CLAUDE_COMMANDS"

# Nettoyer les anciennes installations
for target in "$WOODMAN_DIR" "$WM_DIR"; do
    if [ -e "$target" ] || [ -L "$target" ]; then
        rm -rf "$target"
    fi
done

if [ "$MODE" == "symlink" ]; then
    echo -e "${BLUE}📦 Installation locale (symlink)...${NC}"
    echo ""

    # Créer les symlinks
    ln -s "$COMMANDS_SOURCE" "$WOODMAN_DIR"
    ln -s "$COMMANDS_SOURCE" "$WM_DIR"

    echo "   ✅ /woodman → symlink vers $COMMANDS_SOURCE"
    echo "   ✅ /wm      → symlink (alias)"
    echo ""
    echo -e "${YELLOW}📝 Pour mettre à jour:${NC}"
    echo "   cd $SCRIPT_DIR && git pull"

else
    echo -e "${BLUE}📦 Installation globale (copie)...${NC}"
    echo ""

    # Copier les fichiers
    cp -r "$COMMANDS_SOURCE" "$WOODMAN_DIR"
    cp -r "$COMMANDS_SOURCE" "$WM_DIR"

    # Créer un fichier de version
    echo "$(git -C "$SCRIPT_DIR" rev-parse --short HEAD 2>/dev/null || echo 'unknown')" > "$WOODMAN_DIR/.version"
    cp "$WOODMAN_DIR/.version" "$WM_DIR/.version"

    echo "   ✅ /woodman → copié dans ~/.claude/commands/"
    echo "   ✅ /wm      → copié (alias)"
    echo ""
    echo -e "${YELLOW}📝 Pour mettre à jour:${NC}"
    echo "   /wm:update  (ou relancer ./install.sh --global)"
fi

echo ""

# Compter les commandes
AGENT_COUNT=$(find "$COMMANDS_SOURCE/agents" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
ANALYZE_COUNT=$(find "$COMMANDS_SOURCE/analyze" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DEPLOY_COUNT=$(find "$COMMANDS_SOURCE/deploy" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
TEST_COUNT=$(find "$COMMANDS_SOURCE/test" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
VPS_COUNT=$(find "$COMMANDS_SOURCE/vps" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo -e "${GREEN}✅ Installation réussie!${NC}"
echo ""
echo "📊 Commandes installées:"
echo "   • Agents:    $AGENT_COUNT"
echo "   • Analyze:   $ANALYZE_COUNT"
echo "   • Deploy:    $DEPLOY_COUNT"
echo "   • Test:      $TEST_COUNT"
echo "   • VPS:       $VPS_COUNT"
echo ""

echo -e "${YELLOW}🚀 Usage:${NC}"
echo ""
echo "   /wm:agents:spec-writer        # Générer spec.md"
echo "   /wm:agents:code-simplifier    # Audit simplification"
echo "   /wm:analyze:nuxt              # Analyse Nuxt"
echo "   /wm:deploy:vercel             # Déployer Vercel"
echo "   /wm:vps:orchestrateur         # Orchestrateur VPS"
echo "   /wm:vps:audit                 # Audit VPS"
echo "   /wm:vps:docker                # Gestion Docker"
echo ""
