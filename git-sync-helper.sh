#!/bin/bash
# Git Sync Helper for Replit
# This script helps sync your local changes with remote GitHub repository

echo "🔄 Aequitas Protocol - Git Sync Helper"
echo "======================================"
echo ""

# Show current status
echo "📊 Current Status:"
git log --oneline -3
echo ""
echo "🌐 Remote Status:"
git log --oneline origin/main -3
echo ""

# Check if we're ahead of remote
AHEAD=$(git rev-list --count origin/main..HEAD)
BEHIND=$(git rev-list --count HEAD..origin/main)

echo "📈 Your local repository is:"
echo "  - $AHEAD commits AHEAD of remote"
echo "  - $BEHIND commits BEHIND remote"
echo ""

if [ "$BEHIND" -gt 0 ]; then
    echo "⚠️  You need to pull remote changes first!"
    echo ""
    echo "Options:"
    echo "1. Pull and merge: git pull origin main --no-rebase"
    echo "2. Pull and rebase: git pull origin main --rebase"
    echo "3. Force push (DANGEROUS): git push origin main --force"
    echo ""
    echo "Recommended: Option 1 (pull and merge)"
    echo ""
    read -p "Enter option number (1-3) or 'q' to quit: " choice
    
    case $choice in
        1)
            echo "🔄 Pulling and merging..."
            git pull origin main --no-rebase
            if [ $? -eq 0 ]; then
                echo "✅ Pull successful! Now pushing..."
                git push origin main
            else
                echo "❌ Pull failed. Please resolve conflicts manually."
            fi
            ;;
        2)
            echo "🔄 Pulling and rebasing..."
            git pull origin main --rebase
            if [ $? -eq 0 ]; then
                echo "✅ Rebase successful! Now pushing..."
                git push origin main
            else
                echo "❌ Rebase failed. Please resolve conflicts manually."
            fi
            ;;
        3)
            echo "⚠️  FORCE PUSH - This will overwrite remote changes!"
            read -p "Are you ABSOLUTELY sure? (type 'YES' to confirm): " confirm
            if [ "$confirm" = "YES" ]; then
                git push origin main --force
                echo "✅ Force push complete"
            else
                echo "❌ Cancelled"
            fi
            ;;
        q|Q)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid option"
            exit 1
            ;;
    esac
else
    echo "✅ You're up to date with remote. Safe to push!"
    git push origin main
fi
