#!/bin/bash
# Woodman - Remote Installation Script
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/izo/Woodman/main/install-remote.sh | bash
#
# Ou avec wget:
#   wget -qO- https://raw.githubusercontent.com/izo/Woodman/main/install-remote.sh | bash

set -e

REPO="izo/Woodman"
BRANCH="main"
CLAUDE_COMMANDS="$HOME/.claude/commands"
WOODMAN_DIR="$CLAUDE_COMMANDS/woodman"
WM_DIR="$CLAUDE_COMMANDS/wm"
TMP_DIR=$(mktemp -d)

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo ""
echo -e "${GREEN}🪵 Woodman Remote Installer${NC}"
echo "============================"
echo ""

# Télécharger depuis GitHub
echo -e "${BLUE}📥 Téléchargement depuis GitHub...${NC}"
curl -sL "https://github.com/$REPO/archive/$BRANCH.tar.gz" | tar xz -C "$TMP_DIR"

COMMANDS_SOURCE="$TMP_DIR/Woodman-$BRANCH/commands"

if [ ! -d "$COMMANDS_SOURCE" ]; then
    echo -e "${RED}❌ Erreur: Impossible de télécharger les commandes${NC}"
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

# Copier les fichiers
echo -e "${BLUE}📦 Installation des commandes...${NC}"
cp -r "$COMMANDS_SOURCE" "$WOODMAN_DIR"
cp -r "$COMMANDS_SOURCE" "$WM_DIR"

# Récupérer la version (commit hash)
VERSION=$(curl -s "https://api.github.com/repos/$REPO/commits/$BRANCH" | grep '"sha"' | head -1 | cut -d'"' -f4 | cut -c1-7)
echo "$VERSION" > "$WOODMAN_DIR/.version"
echo "$VERSION" > "$WM_DIR/.version"
echo "https://github.com/$REPO" > "$WOODMAN_DIR/.source"
echo "https://github.com/$REPO" > "$WM_DIR/.source"

echo ""
echo "   ✅ /woodman → installé"
echo "   ✅ /wm      → installé (alias)"

# Compter les commandes
AGENT_COUNT=$(find "$WOODMAN_DIR/agents" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
ANALYZE_COUNT=$(find "$WOODMAN_DIR/analyze" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DEPLOY_COUNT=$(find "$WOODMAN_DIR/deploy" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
TEST_COUNT=$(find "$WOODMAN_DIR/test" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
VPS_COUNT=$(find "$WOODMAN_DIR/vps" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

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
echo "📌 Version: $VERSION"
echo ""

echo -e "${YELLOW}🚀 Usage:${NC}"
echo ""
echo "   /wm:agents:spec-writer        # Générer spec.md"
echo "   /wm:agents:code-simplifier    # Audit simplification"
echo "   /wm:vps:orchestrateur         # Orchestrateur VPS"
echo "   /wm:vps:docker                # Gestion Docker"
echo "   /wm:update                    # Mettre à jour"
echo ""

echo -e "${YELLOW}📝 Pour mettre à jour:${NC}"
echo "   /wm:update"
echo "   # ou relancer: curl -fsSL https://raw.githubusercontent.com/$REPO/main/install-remote.sh | bash"
echo ""
