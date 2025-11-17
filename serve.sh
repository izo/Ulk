#!/bin/bash

# Script pour tester Woodman localement
# Usage: ./serve.sh [port]

PORT=${1:-8000}

echo "🪵 Woodman Local Server"
echo "======================="
echo ""
echo "🔄 Génération de la documentation..."
node generate-claude-cheatsheet.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Documentation générée!"
    echo ""
    echo "🌐 Démarrage du serveur local sur le port $PORT..."
    echo "📖 Ouvrez: http://localhost:$PORT"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo ""

    # Essayer Python 3 d'abord, sinon Node.js
    if command -v python3 &> /dev/null; then
        python3 -m http.server $PORT
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer $PORT
    elif command -v npx &> /dev/null; then
        npx http-server -p $PORT
    else
        echo "❌ Erreur: Python ou Node.js requis pour servir les fichiers"
        echo "Installez l'un des deux et réessayez"
        exit 1
    fi
else
    echo ""
    echo "❌ Erreur lors de la génération de la documentation"
    exit 1
fi
