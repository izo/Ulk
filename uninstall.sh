#!/bin/bash
# ulk - Uninstall Script
#
# Usage:
#   ./uninstall.sh           # Interactive (with confirmation)
#   ./uninstall.sh --force   # No confirmation
#   ./uninstall.sh --dry-run # Preview only

set -e

CLAUDE_COMMANDS="$HOME/.claude/commands"
ULK_TARGET="$CLAUDE_COMMANDS/ulk"
# Also clean up old woodman/wm installations
WOODMAN_TARGET="$CLAUDE_COMMANDS/woodman"
WM_TARGET="$CLAUDE_COMMANDS/wm"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Options
FORCE=false
DRY_RUN=false

for arg in "$@"; do
    case "$arg" in
        --force|-f)
            FORCE=true
            ;;
        --dry-run|-n)
            DRY_RUN=true
            ;;
    esac
done

echo ""
echo -e "${RED}🐺 ulk Uninstaller${NC}"
echo "=================="
echo ""

# Collecter les cibles à supprimer
targets=()
target_names=()

if [ -L "$ULK_TARGET" ] || [ -e "$ULK_TARGET" ]; then
    targets+=("$ULK_TARGET")
    target_names+=("/ulk")
fi

if [ -L "$WOODMAN_TARGET" ] || [ -e "$WOODMAN_TARGET" ]; then
    targets+=("$WOODMAN_TARGET")
    target_names+=("/woodman (ancienne version)")
fi

if [ -L "$WM_TARGET" ] || [ -e "$WM_TARGET" ]; then
    targets+=("$WM_TARGET")
    target_names+=("/wm (ancienne version)")
fi

# Rien à supprimer
if [ ${#targets[@]} -eq 0 ]; then
    echo -e "${YELLOW}ℹ️  ulk n'est pas installé${NC}"
    echo ""
    echo "   Emplacement vérifié: $CLAUDE_COMMANDS"
    echo ""
    exit 0
fi

# Afficher ce qui sera supprimé
echo -e "${BLUE}📦 Éléments à supprimer:${NC}"
echo ""
for i in "${!targets[@]}"; do
    if [ -L "${targets[$i]}" ]; then
        echo "   • ${target_names[$i]} (symlink → $(readlink "${targets[$i]}"))"
    else
        echo "   • ${target_names[$i]} (dossier)"
    fi
done
echo ""

# Dry run: afficher et quitter
if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}🔍 Mode dry-run: aucune suppression effectuée${NC}"
    echo ""
    exit 0
fi

# Confirmation (sauf si --force)
if [ "$FORCE" != true ]; then
    echo -e "${YELLOW}⚠️  Cette action est irréversible.${NC}"
    echo ""
    read -p "Confirmer la désinstallation ? [y/N] " -n 1 -r
    echo ""
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}❌ Désinstallation annulée${NC}"
        echo ""
        exit 0
    fi
fi

# Supprimer les cibles
removed=0

for i in "${!targets[@]}"; do
    rm -rf "${targets[$i]}"
    echo -e "   ${GREEN}✅${NC} ${target_names[$i]} supprimé"
    removed=$((removed + 1))
done

echo ""
echo -e "${GREEN}✅ Désinstallation réussie!${NC}"
echo ""
echo -e "${BLUE}📝 Pour réinstaller:${NC}"
echo "   ./install.sh"
echo ""
