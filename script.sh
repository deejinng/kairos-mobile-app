#!/bin/bash

# React Native APK Size Analysis & Optimization Script
# Run this in your React Native project root

echo "🔍 Starting React Native APK Size Analysis..."
echo ""

# 1. Check current APK size
echo "📦 Current APK sizes:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "android/app/build/outputs/apk/release" ]; then
    du -sh android/app/build/outputs/apk/release/*.apk 2>/dev/null || echo "No APK found. Build first!"
else
    echo "No release APK found. Build with: cd android && ./gradlew assembleRelease"
fi
echo ""

# 2. Check node_modules size
echo "📚 node_modules analysis:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "node_modules" ]; then
    echo "Total size: $(du -sh node_modules | cut -f1)"
    echo ""
    echo "Top 20 largest packages:"
    du -sh node_modules/* | sort -h -r | head -20
else
    echo "node_modules not found!"
fi
echo ""

# 3. Check image assets
echo "🖼️  Image assets analysis:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
find . -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" | \
    grep -v node_modules | grep -v android/app/build | \
    xargs du -ch 2>/dev/null | tail -1 | \
    awk '{print "Total images: " $1}'
echo ""
echo "Largest images (>100KB):"
find . \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) \
    -size +100k \
    -not -path "*/node_modules/*" \
    -not -path "*/android/app/build/*" \
    -exec ls -lh {} \; 2>/dev/null | \
    awk '{print $5, $9}' | head -20
echo ""

# 4. Check for unused dependencies
echo "🗑️  Checking for unused dependencies..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v depcheck &> /dev/null; then
    depcheck --json | grep -A 5 "dependencies"
else
    echo "Install depcheck: npm install -g depcheck"
    echo "Then run: depcheck"
fi
echo ""

# 5. Check vector icons fonts
echo "🎨 Icon fonts analysis:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "android/app/src/main/assets/fonts" ]; then
    echo "Icon fonts found:"
    du -sh android/app/src/main/assets/fonts/*.ttf 2>/dev/null
    echo ""
    echo "Total fonts size: $(du -sh android/app/src/main/assets/fonts 2>/dev/null | cut -f1)"
else
    echo "No fonts directory found"
fi
echo ""

# 6. Summary and recommendations
echo "💡 OPTIMIZATION RECOMMENDATIONS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "QUICK WINS:"
echo "1. Enable APK splitting → Saves 50-75MB instantly"
echo "2. Remove unused icon fonts → Saves 20-30MB"
echo "3. Compress images to WebP → Saves 30-50MB"
echo "4. Enable ProGuard + minification → Saves 15-25MB"
echo "5. Use Hermes engine → Saves 10-15MB"
echo ""
echo "NEXT STEPS:"
echo "1. Run: depcheck (to find unused packages)"
echo "2. Optimize images with: https://tinypng.com or imagemin"
echo "3. Update android/app/build.gradle with optimizations"
echo "4. Build AAB instead: cd android && ./gradlew bundleRelease"
echo ""
echo "TARGET: Get from 128MB → 20-30MB per APK! 🎯"