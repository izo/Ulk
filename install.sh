#!/bin/bash
# Woodman - Installation Script
# Installe les agents comme Custom Commands dans Claude Code
#
# Usage:
#   ./install.sh          # Installation standard
#   ./install.sh --flat   # Installation plate (agents à la racine)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMANDS_SOURCE="$SCRIPT_DIR/commands"
CLAUDE_COMMANDS="$HOME/.claude/commands"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${GREEN}🪵 Woodman Installer${NC}"
echo "===================="
echo ""

# Vérifier que le dossier commands existe
if [ ! -d "$COMMANDS_SOURCE" ]; then
    echo "❌ Erreur: Dossier commands/ non trouvé"
    exit 1
fi

# Créer le dossier .claude/commands s'il n'existe pas
mkdir -p "$CLAUDE_COMMANDS"

# Fonction pour créer/mettre à jour un symlink
create_symlink() {
    local target="$1"
    local link_name="$2"

    if [ -e "$link_name" ] || [ -L "$link_name" ]; then
        rm -rf "$link_name"
    fi
    ln -s "$target" "$link_name"
}

# Installation des alias
echo -e "${BLUE}📦 Installation des commandes...${NC}"
echo ""

# Créer les symlinks principaux (woodman et wm pointent vers le même dossier)
create_symlink "$COMMANDS_SOURCE" "$CLAUDE_COMMANDS/woodman"
create_symlink "$COMMANDS_SOURCE" "$CLAUDE_COMMANDS/wm"

echo "   ✅ /woodman → installé"
echo "   ✅ /wm      → installé (alias)"
echo ""

# Compter les commandes
AGENT_COUNT=$(find "$COMMANDS_SOURCE/agents" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
ANALYZE_COUNT=$(find "$COMMANDS_SOURCE/analyze" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DEPLOY_COUNT=$(find "$COMMANDS_SOURCE/deploy" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
TEST_COUNT=$(find "$COMMANDS_SOURCE/test" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

echo -e "${GREEN}✅ Installation réussie!${NC}"
echo ""
echo "📊 Commandes installées:"
echo "   • Agents:    $AGENT_COUNT commandes"
echo "   • Analyze:   $ANALYZE_COUNT commandes"
echo "   • Deploy:    $DEPLOY_COUNT commandes"
echo "   • Test:      $TEST_COUNT commandes"
echo ""

echo -e "${YELLOW}🚀 Usage:${NC}"
echo ""
echo "   Forme longue:    /woodman:agents:spec-writer"
echo "   Forme courte:    /wm:agents:spec-writer"
echo ""
echo "   Exemples:"
echo "     /wm:agents:code-simplifier    # Audit simplification"
echo "     /wm:agents:spec-writer        # Générer spec.md"
echo "     /wm:agents:todo-generator     # Générer todo.md"
echo "     /wm:agents:code-auditor       # Audit code complet"
echo "     /wm:analyze:nuxt              # Analyse Nuxt"
echo "     /wm:deploy:vercel             # Déployer sur Vercel"
echo ""

echo "📍 Chemin: $CLAUDE_COMMANDS/woodman"
echo ""
