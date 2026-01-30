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
CYAN='\033[0;36m'
DIM='\033[2m'
BOLD='\033[1m'
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

# ═══════════════════════════════════════════════════════════════
# TUI Functions
# ═══════════════════════════════════════════════════════════════

print_header() {
    echo ""
    echo -e "${RED}"
    cat << 'EOF'
    ┌─────────────────────────────────────────┐
    │                                         │
    │        ╭━━━╮                            │
    │        ┃ 🐺 ┃  u l k                    │
    │        ╰━━━╯                            │
    │                                         │
    │        Uninstaller                      │
    │                                         │
    └─────────────────────────────────────────┘
EOF
    echo -e "${NC}"
}

print_box() {
    local title="$1"
    local width=45
    local padding=$(( (width - ${#title} - 2) / 2 ))

    echo ""
    echo -e "${DIM}┌$(printf '─%.0s' $(seq 1 $width))┐${NC}"
    echo -e "${DIM}│${NC}$(printf ' %.0s' $(seq 1 $padding))${BOLD}$title${NC}$(printf ' %.0s' $(seq 1 $((width - padding - ${#title}))))${DIM}│${NC}"
    echo -e "${DIM}└$(printf '─%.0s' $(seq 1 $width))┘${NC}"
}

print_item() {
    local status="$1"
    local text="$2"
    case "$status" in
        ok)      echo -e "  ${GREEN}✓${NC} $text" ;;
        warn)    echo -e "  ${YELLOW}○${NC} $text" ;;
        error)   echo -e "  ${RED}✗${NC} $text" ;;
        info)    echo -e "  ${BLUE}→${NC} $text" ;;
        pending) echo -e "  ${DIM}◦${NC} ${DIM}$text${NC}" ;;
        delete)  echo -e "  ${RED}−${NC} $text" ;;
    esac
}

# ═══════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════

clear
print_header

# Mode info
if [ "$DRY_RUN" == "true" ]; then
    echo -e "  ${DIM}Mode:${NC} ${YELLOW}dry-run${NC} ${DIM}(preview)${NC}"
elif [ "$FORCE" == "true" ]; then
    echo -e "  ${DIM}Mode:${NC} ${RED}force${NC} ${DIM}(no confirmation)${NC}"
else
    echo -e "  ${DIM}Mode:${NC} ${GREEN}interactive${NC}"
fi

# Collecter les cibles à supprimer
targets=()
target_names=()
target_types=()

if [ -L "$ULK_TARGET" ]; then
    targets+=("$ULK_TARGET")
    target_names+=("/ulk")
    target_types+=("symlink → $(readlink "$ULK_TARGET")")
elif [ -e "$ULK_TARGET" ]; then
    targets+=("$ULK_TARGET")
    target_names+=("/ulk")
    target_types+=("directory")
fi

if [ -L "$WOODMAN_TARGET" ] || [ -e "$WOODMAN_TARGET" ]; then
    targets+=("$WOODMAN_TARGET")
    target_names+=("/woodman")
    target_types+=("legacy")
fi

if [ -L "$WM_TARGET" ] || [ -e "$WM_TARGET" ]; then
    targets+=("$WM_TARGET")
    target_names+=("/wm")
    target_types+=("legacy")
fi

# Rien à supprimer
if [ ${#targets[@]} -eq 0 ]; then
    print_box "Status"
    echo ""
    print_item warn "ulk n'est pas installé"
    echo ""
    echo -e "  ${DIM}Emplacement vérifié:${NC}"
    echo -e "  ${DIM}$CLAUDE_COMMANDS${NC}"
    echo ""
    exit 0
fi

# Afficher ce qui sera supprimé
print_box "Éléments trouvés"
echo ""

for i in "${!targets[@]}"; do
    echo -e "  ${RED}●${NC} ${BOLD}${target_names[$i]}${NC}"
    echo -e "    ${DIM}${target_types[$i]}${NC}"
done
echo ""

# Dry run: afficher et quitter
if [ "$DRY_RUN" = true ]; then
    echo -e "${DIM}─────────────────────────────────────────────────${NC}"
    echo ""
    echo -e "  ${YELLOW}○${NC} ${BOLD}Mode dry-run${NC}"
    echo -e "    ${DIM}Aucune suppression effectuée${NC}"
    echo ""
    exit 0
fi

# Confirmation (sauf si --force)
if [ "$FORCE" != true ]; then
    echo -e "${DIM}─────────────────────────────────────────────────${NC}"
    echo ""
    echo -e "  ${YELLOW}⚠${NC}  ${BOLD}Confirmer la suppression ?${NC}"
    echo ""
    echo -e "    ${DIM}[y] Oui, supprimer${NC}"
    echo -e "    ${DIM}[n] Non, annuler${NC}"
    echo ""

    read -p "  → " -n 1 -r
    echo ""
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "  ${YELLOW}○${NC} ${BOLD}Annulé${NC}"
        echo ""
        exit 0
    fi
fi

# Supprimer les cibles
print_box "Suppression"
echo ""

for i in "${!targets[@]}"; do
    rm -rf "${targets[$i]}"
    print_item delete "${target_names[$i]} supprimé"
done

echo ""

# Footer
echo -e "${DIM}─────────────────────────────────────────────────${NC}"
echo ""
echo -e "  ${GREEN}✓${NC} ${BOLD}Désinstallation terminée${NC}"
echo ""
echo -e "  ${DIM}Réinstaller:${NC} ./install.sh"
echo ""
