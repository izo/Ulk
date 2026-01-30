#!/bin/bash
# ulk - Installation Script
#
# Installation locale (symlink):
#   ./install.sh
#
# Installation locale avec agents VPS:
#   ./install.sh --with-vps
#
# Installation globale (copie):
#   ./install.sh --global
#
# Installation globale avec agents VPS:
#   ./install.sh --global --with-vps
#
# Installation one-liner depuis GitHub:
#   curl -fsSL https://raw.githubusercontent.com/izo/ulk/main/install-remote.sh | bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMANDS_SOURCE="$SCRIPT_DIR/commands"
CLAUDE_COMMANDS="$HOME/.claude/commands"
ULK_DIR="$CLAUDE_COMMANDS/ulk"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

MODE="symlink"
INSTALL_VPS=false

for arg in "$@"; do
    case "$arg" in
        --global|-g)
            MODE="copy"
            ;;
        --with-vps)
            INSTALL_VPS=true
            ;;
    esac
done

echo ""
echo -e "${GREEN}🐺 ulk Installer${NC}"
echo "================"
echo ""

# Vérifier que le dossier commands existe
if [ ! -d "$COMMANDS_SOURCE" ]; then
    echo -e "${RED}❌ Erreur: Dossier commands/ non trouvé${NC}"
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

install_dir() {
    local target_dir="$1"
    local mode="$2"

    mkdir -p "$target_dir"

    # Installer chaque sous-dossier (sauf vps si non demandé)
    for subdir in "$COMMANDS_SOURCE"/*/; do
        [ ! -d "$subdir" ] && continue
        local dirname=$(basename "$subdir")

        # Skip VPS sauf si --with-vps
        if [ "$dirname" == "vps" ] && [ "$INSTALL_VPS" != "true" ]; then
            continue
        fi

        if [ "$mode" == "symlink" ]; then
            ln -s "$subdir" "$target_dir/$dirname"
        else
            cp -r "$subdir" "$target_dir/$dirname"
        fi
    done

    # Copier les fichiers à la racine de commands/ (README, etc.)
    for file in "$COMMANDS_SOURCE"/*.md; do
        [ ! -f "$file" ] && continue
        if [ "$mode" == "symlink" ]; then
            ln -s "$file" "$target_dir/$(basename "$file")"
        else
            cp "$file" "$target_dir/$(basename "$file")"
        fi
    done
}

if [ "$MODE" == "symlink" ]; then
    echo -e "${BLUE}📦 Installation locale (symlink)...${NC}"
    echo ""

    install_dir "$ULK_DIR" "symlink"

    echo "   ✅ /ulk → symlinks vers $COMMANDS_SOURCE"
    echo ""
    echo -e "${YELLOW}📝 Pour mettre à jour:${NC}"
    echo "   cd $SCRIPT_DIR && git pull"

else
    echo -e "${BLUE}📦 Installation globale (copie)...${NC}"
    echo ""

    install_dir "$ULK_DIR" "copy"

    # Créer un fichier de version
    echo "$(git -C "$SCRIPT_DIR" rev-parse --short HEAD 2>/dev/null || echo 'unknown')" > "$ULK_DIR/.version"

    echo "   ✅ /ulk → copié dans ~/.claude/commands/"
    echo ""
    echo -e "${YELLOW}📝 Pour mettre à jour:${NC}"
    echo "   /ulk:update  (ou relancer ./install.sh --global)"
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
if [ "$INSTALL_VPS" == "true" ]; then
    echo "   • VPS:       $VPS_COUNT"
else
    echo -e "   • VPS:       ${YELLOW}non installé${NC} (ajouter --with-vps)"
fi
echo ""

echo -e "${YELLOW}🚀 Usage:${NC}"
echo ""
echo "   /ulk:agents:spec-writer        # Générer docs/spec.md"
echo "   /ulk:agents:robocop            # Fixer erreurs"
echo "   /ulk:agents:audit-complet      # Audit complet (5 agents)"
echo "   /ulk:agents:legacy-revival     # Revival code legacy (6 agents)"
echo "   /ulk:agents:pre-release        # Checklist pre-release + GO/NO-GO"
echo "   /ulk:agents:picsou             # Estimation coûts d'hébergement"
echo "   /ulk:agents:steve              # API mobile (audit web → API iOS/Android)"
echo "   /ulk:agents:jobs               # Implémentation Apple (SwiftUI multi-plateforme)"
echo "   /ulk:agents:pencil-generator   # Générer fichiers .pen depuis Next.js"
echo "   /ulk:analyze:nuxt              # Analyse Nuxt"
echo "   /ulk:deploy:vercel             # Déployer Vercel"
if [ "$INSTALL_VPS" == "true" ]; then
    echo "   /ulk:vps:orchestrateur         # Orchestrateur VPS"
fi
echo ""
