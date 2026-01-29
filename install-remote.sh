#!/bin/bash
# ulk - Remote Installation Script
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/izo/ulk/main/install-remote.sh | bash
#
# Ou avec wget:
#   wget -qO- https://raw.githubusercontent.com/izo/ulk/main/install-remote.sh | bash

set -e

REPO="izo/ulk"
BRANCH="main"
CLAUDE_COMMANDS="$HOME/.claude/commands"
ULK_DIR="$CLAUDE_COMMANDS/ulk"
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
echo -e "${GREEN}⚡ ulk Remote Installer${NC}"
echo "========================"
echo ""

# Télécharger depuis GitHub
echo -e "${BLUE}📥 Téléchargement depuis GitHub...${NC}"
curl -sL "https://github.com/$REPO/archive/$BRANCH.tar.gz" | tar xz -C "$TMP_DIR"

COMMANDS_SOURCE="$TMP_DIR/ulk-$BRANCH/commands"

if [ ! -d "$COMMANDS_SOURCE" ]; then
    echo -e "${RED}❌ Erreur: Impossible de télécharger les commandes${NC}"
    exit 1
fi

# Créer le dossier .claude/commands s'il n'existe pas
mkdir -p "$CLAUDE_COMMANDS"

# Nettoyer les anciennes installations (woodman, wm, ulk)
for target in "$CLAUDE_COMMANDS/woodman" "$CLAUDE_COMMANDS/wm" "$ULK_DIR"; do
    if [ -e "$target" ] || [ -L "$target" ]; then
        rm -rf "$target"
    fi
done

# Copier les fichiers
echo -e "${BLUE}📦 Installation des commandes...${NC}"
cp -r "$COMMANDS_SOURCE" "$ULK_DIR"

# Récupérer la version (commit hash)
VERSION=$(curl -s "https://api.github.com/repos/$REPO/commits/$BRANCH" | grep '"sha"' | head -1 | cut -d'"' -f4 | cut -c1-7)
echo "$VERSION" > "$ULK_DIR/.version"
echo "https://github.com/$REPO" > "$ULK_DIR/.source"

echo ""
echo "   ✅ /ulk → installé"

# Compter les commandes
AGENT_COUNT=$(find "$ULK_DIR/agents" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
ANALYZE_COUNT=$(find "$ULK_DIR/analyze" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DEPLOY_COUNT=$(find "$ULK_DIR/deploy" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
TEST_COUNT=$(find "$ULK_DIR/test" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
VPS_COUNT=$(find "$ULK_DIR/vps" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

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
echo "   /ulk:agents:spec-writer        # Générer spec.md"
echo "   /ulk:agents:robocop            # Fixer erreurs"
echo "   /ulk:agents:audit-complet      # Audit complet (5 agents)"
echo "   /ulk:agents:legacy-revival     # Revival code legacy (6 agents)"
echo "   /ulk:agents:pre-release        # Checklist pre-release + GO/NO-GO"
echo "   /ulk:vps:orchestrateur         # Orchestrateur VPS"
echo "   /ulk:update                    # Mettre à jour"
echo ""

echo -e "${YELLOW}📝 Pour mettre à jour:${NC}"
echo "   /ulk:update"
echo "   # ou relancer: curl -fsSL https://raw.githubusercontent.com/$REPO/main/install-remote.sh | bash"
echo ""
