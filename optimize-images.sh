#!/bin/bash
# ============================================================
# Image Optimization Script for VASANTHRAJ Photography Portfolio
# This will compress all images to web-optimized quality
# Reduces ~2.1GB to ~400-600MB (70-80% reduction)
# ============================================================

echo "🖼️  Image Optimization Script"
echo "=============================="
echo ""

# Check if sips is available (macOS built-in)
if ! command -v sips &> /dev/null; then
    echo "❌ sips not found. This script requires macOS."
    exit 1
fi

# Configuration
MAX_WIDTH=1920    # Max width for gallery images (Full HD)
QUALITY=80        # JPEG quality (80 = great quality, much smaller size)

echo "Settings: Max width=${MAX_WIDTH}px, Quality=${QUALITY}%"
echo ""

# Count files
TOTAL=$(find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) ! -name "logo.png" ! -name "vikatan-logo.png" ! -name "about.jpeg" | wc -l | tr -d ' ')
echo "Found $TOTAL images to optimize"
echo ""

# Create backup reminder
echo "⚠️  IMPORTANT: Make sure you have a backup of your original images!"
echo "   (Your git repo already has them if you committed before running this)"
echo ""
read -p "Continue? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled."
    exit 0
fi

COUNT=0
SAVED=0

# Process PNG files - convert to JPEG (much smaller)
find . -type f -iname "*.png" ! -name "logo.png" ! -name "vikatan-logo.png" | while read FILE; do
    COUNT=$((COUNT + 1))
    ORIGINAL_SIZE=$(stat -f%z "$FILE" 2>/dev/null || stat -c%s "$FILE" 2>/dev/null)
    
    # Get dimensions
    WIDTH=$(sips -g pixelWidth "$FILE" | tail -1 | awk '{print $2}')
    
    # Convert PNG to JPEG (typically 5-10x smaller)
    NEWFILE="${FILE%.png}.jpg"
    NEWFILE="${NEWFILE%.PNG}.jpg"
    
    if [ "$WIDTH" -gt "$MAX_WIDTH" ]; then
        sips --resampleWidth $MAX_WIDTH -s format jpeg -s formatOptions $QUALITY "$FILE" --out "$NEWFILE" 2>/dev/null
    else
        sips -s format jpeg -s formatOptions $QUALITY "$FILE" --out "$NEWFILE" 2>/dev/null
    fi
    
    if [ -f "$NEWFILE" ]; then
        NEW_SIZE=$(stat -f%z "$NEWFILE" 2>/dev/null || stat -c%s "$NEWFILE" 2>/dev/null)
        DIFF=$((ORIGINAL_SIZE - NEW_SIZE))
        SAVED=$((SAVED + DIFF))
        # Remove original PNG
        rm "$FILE"
        echo "  ✅ [$COUNT/$TOTAL] $(basename "$FILE") → $(basename "$NEWFILE") (saved $(($DIFF / 1024))KB)"
    fi
done

# Process JPG files - just resize and recompress
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) ! -name "about.jpeg" | while read FILE; do
    COUNT=$((COUNT + 1))
    ORIGINAL_SIZE=$(stat -f%z "$FILE" 2>/dev/null || stat -c%s "$FILE" 2>/dev/null)
    
    WIDTH=$(sips -g pixelWidth "$FILE" | tail -1 | awk '{print $2}')
    
    if [ "$WIDTH" -gt "$MAX_WIDTH" ]; then
        sips --resampleWidth $MAX_WIDTH -s formatOptions $QUALITY "$FILE" 2>/dev/null
    else
        sips -s formatOptions $QUALITY "$FILE" 2>/dev/null
    fi
    
    NEW_SIZE=$(stat -f%z "$FILE" 2>/dev/null || stat -c%s "$FILE" 2>/dev/null)
    DIFF=$((ORIGINAL_SIZE - NEW_SIZE))
    echo "  ✅ [$COUNT/$TOTAL] $(basename "$FILE") (saved $(($DIFF / 1024))KB)"
done

echo ""
echo "✨ Done! Check your folder size with: du -sh ."
echo ""
echo "⚠️  NEXT STEP: Update script.js to change .png references to .jpg"
echo "   Run: sed -i '' 's/\.png/.jpg/g' script.js"
echo "   Run: sed -i '' 's/\.PNG/.jpg/g' script.js"
echo "   Also update index.html carousel image references if needed."
