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
CYAN='\033[0;36m'
DIM='\033[2m'
BOLD='\033[1m'
NC='\033[0m'

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

# ═══════════════════════════════════════════════════════════════
# TUI Functions
# ═══════════════════════════════════════════════════════════════

print_header() {
    echo ""
    echo -e "${CYAN}"
    cat << 'EOF'
    ┌─────────────────────────────────────────┐
    │                                         │
    │        ╭━━━╮                            │
    │        ┃ 🐺 ┃  u l k                    │
    │        ╰━━━╯                            │
    │                                         │
    │        AI Development Toolkit           │
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
    esac
}

print_stats() {
    local label="$1"
    local value="$2"
    local color="${3:-$NC}"
    printf "  ${DIM}│${NC} %-12s ${color}%s${NC}\n" "$label" "$value"
}

spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    while ps -p $pid > /dev/null 2>&1; do
        for (( i=0; i<${#spinstr}; i++ )); do
            printf "\r  ${CYAN}${spinstr:$i:1}${NC} $2"
            sleep $delay
        done
    done
    printf "\r"
}

# ═══════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════

clear
print_header

echo -e "  ${DIM}Source:${NC} github.com/$REPO"
echo -e "  ${DIM}Branch:${NC} $BRANCH"

print_box "Installation"

# Télécharger depuis GitHub
print_item info "Téléchargement depuis GitHub..."
curl -sL "https://github.com/$REPO/archive/$BRANCH.tar.gz" | tar xz -C "$TMP_DIR"
print_item ok "Téléchargement terminé"

COMMANDS_SOURCE="$TMP_DIR/ulk-$BRANCH/commands"

if [ ! -d "$COMMANDS_SOURCE" ]; then
    print_item error "Impossible de télécharger les commandes"
    echo ""
    exit 1
fi

# Créer le dossier .claude/commands s'il n'existe pas
mkdir -p "$CLAUDE_COMMANDS"
print_item ok "Dossier ~/.claude/commands"

# Nettoyer les anciennes installations (woodman, wm, ulk)
cleaned=false
for target in "$CLAUDE_COMMANDS/woodman" "$CLAUDE_COMMANDS/wm" "$ULK_DIR"; do
    if [ -e "$target" ] || [ -L "$target" ]; then
        rm -rf "$target"
        cleaned=true
    fi
done

if [ "$cleaned" == "true" ]; then
    print_item ok "Anciennes installations nettoyées"
fi

# Copier les fichiers
cp -r "$COMMANDS_SOURCE" "$ULK_DIR"
print_item ok "Commandes installées"

# Récupérer la version (commit hash)
VERSION=$(curl -s "https://api.github.com/repos/$REPO/commits/$BRANCH" | grep '"sha"' | head -1 | cut -d'"' -f4 | cut -c1-7)
echo "$VERSION" > "$ULK_DIR/.version"
echo "https://github.com/$REPO" > "$ULK_DIR/.source"

# Compter les commandes
AGENT_COUNT=$(find "$ULK_DIR/agents" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
ANALYZE_COUNT=$(find "$ULK_DIR/analyze" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DEPLOY_COUNT=$(find "$ULK_DIR/deploy" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
TEST_COUNT=$(find "$ULK_DIR/test" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
VPS_COUNT=$(find "$ULK_DIR/vps" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

print_box "Commandes installées"
echo ""
print_stats "Agents" "$AGENT_COUNT" "$GREEN"
print_stats "Analyze" "$ANALYZE_COUNT" "$GREEN"
print_stats "Deploy" "$DEPLOY_COUNT" "$GREEN"
print_stats "Test" "$TEST_COUNT" "$GREEN"
print_stats "VPS" "$VPS_COUNT" "$GREEN"
echo ""

print_box "Usage"
echo ""
echo -e "  ${DIM}Générer spec${NC}     ${CYAN}/ulk:agents:spec-writer${NC}"
echo -e "  ${DIM}Fixer erreurs${NC}    ${CYAN}/ulk:agents:robocop${NC}"
echo -e "  ${DIM}Audit complet${NC}    ${CYAN}/ulk:agents:audit-complet${NC}"
echo -e "  ${DIM}Pre-release${NC}      ${CYAN}/ulk:agents:pre-release${NC}"
echo -e "  ${DIM}Mise à jour${NC}      ${CYAN}/ulk:update${NC}"
echo ""

# Footer
echo -e "${DIM}─────────────────────────────────────────────────${NC}"
echo ""
echo -e "  ${GREEN}✓${NC} ${BOLD}Installation réussie${NC}"
echo -e "    ${DIM}Version: $VERSION${NC}"
echo ""
