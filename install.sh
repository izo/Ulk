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
CYAN='\033[0;36m'
DIM='\033[2m'
BOLD='\033[1m'
NC='\033[0m'

# Options
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

# Mode info
if [ "$MODE" == "symlink" ]; then
    echo -e "  ${DIM}Mode:${NC} ${GREEN}symlink${NC} ${DIM}(dev)${NC}"
else
    echo -e "  ${DIM}Mode:${NC} ${YELLOW}copy${NC} ${DIM}(global)${NC}"
fi

if [ "$INSTALL_VPS" == "true" ]; then
    echo -e "  ${DIM}VPS:${NC}  ${GREEN}inclus${NC}"
else
    echo -e "  ${DIM}VPS:${NC}  ${DIM}non inclus${NC}"
fi

# Vérifier que le dossier commands existe
if [ ! -d "$COMMANDS_SOURCE" ]; then
    print_box "Erreur"
    print_item error "Dossier commands/ non trouvé"
    echo ""
    exit 1
fi

print_box "Installation"

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
    install_dir "$ULK_DIR" "symlink"
    print_item ok "Symlinks créés"
else
    install_dir "$ULK_DIR" "copy"
    echo "$(git -C "$SCRIPT_DIR" rev-parse --short HEAD 2>/dev/null || echo 'unknown')" > "$ULK_DIR/.version"
    print_item ok "Fichiers copiés"
fi

# Compter les commandes
AGENT_COUNT=$(find "$COMMANDS_SOURCE/agents" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
ANALYZE_COUNT=$(find "$COMMANDS_SOURCE/analyze" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DEPLOY_COUNT=$(find "$COMMANDS_SOURCE/deploy" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
TEST_COUNT=$(find "$COMMANDS_SOURCE/test" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
VPS_COUNT=$(find "$COMMANDS_SOURCE/vps" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

print_box "Commandes installées"
echo ""
print_stats "Agents" "$AGENT_COUNT" "$GREEN"
print_stats "Analyze" "$ANALYZE_COUNT" "$GREEN"
print_stats "Deploy" "$DEPLOY_COUNT" "$GREEN"
print_stats "Test" "$TEST_COUNT" "$GREEN"
if [ "$INSTALL_VPS" == "true" ]; then
    print_stats "VPS" "$VPS_COUNT" "$GREEN"
else
    print_stats "VPS" "—" "$DIM"
fi
echo ""

print_box "Usage"
echo ""
echo -e "  ${DIM}Générer spec${NC}     ${CYAN}/ulk:agents:spec-writer${NC}"
echo -e "  ${DIM}Fixer erreurs${NC}    ${CYAN}/ulk:agents:robocop${NC}"
echo -e "  ${DIM}Audit complet${NC}    ${CYAN}/ulk:agents:audit-complet${NC}"
echo -e "  ${DIM}Pre-release${NC}      ${CYAN}/ulk:agents:pre-release${NC}"
echo -e "  ${DIM}Analyse Nuxt${NC}     ${CYAN}/ulk:analyze:nuxt${NC}"
echo ""

# Footer
echo -e "${DIM}─────────────────────────────────────────────────${NC}"
echo ""
echo -e "  ${GREEN}✓${NC} ${BOLD}Installation réussie${NC}"
echo ""

if [ "$MODE" == "symlink" ]; then
    echo -e "  ${DIM}Mise à jour:${NC} git pull"
else
    echo -e "  ${DIM}Mise à jour:${NC} /ulk:update"
fi
echo ""
