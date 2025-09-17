#!/bin/bash
# Build script for MinecraftUI Core

echo "🔨 Building MinecraftUI Core..."

# Clean dist directory
echo "🧹 Cleaning dist directory..."
rm -rf dist/*

# Build SCSS
echo "🎨 Building CSS..."
sass src/scss/minecraft-ui.scss dist/minecraft-ui.css --style=expanded --source-map
if [ $? -eq 0 ]; then
    echo "✅ CSS built successfully"
else
    echo "❌ CSS build failed"
    exit 1
fi

# Build minified CSS
echo "🎨 Building minified CSS..."
sass src/scss/minecraft-ui.scss dist/minecraft-ui.min.css --style=compressed --no-source-map
if [ $? -eq 0 ]; then
    echo "✅ Minified CSS built successfully"
else
    echo "❌ Minified CSS build failed"
    exit 1
fi

# Build TypeScript
echo "⚡ Building TypeScript..."
tsc
if [ $? -eq 0 ]; then
    echo "✅ TypeScript built successfully"
else
    echo "❌ TypeScript build failed"
    exit 1
fi

# Build with Rollup
echo "📦 Building with Rollup..."
rollup -c
if [ $? -eq 0 ]; then
    echo "✅ Rollup build completed successfully"
else
    echo "❌ Rollup build failed"
    exit 1
fi

# Copy additional files
echo "📋 Copying additional files..."
cp README.md dist/ 2>/dev/null || echo "No README.md found"
cp package.json dist/ 2>/dev/null || echo "No package.json found"

# Create package info
echo "📊 Generating build info..."
cat > dist/build-info.json << EOF
{
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "$(node -p "require('./package.json').version" 2>/dev/null || echo 'unknown')",
  "files": [
    "minecraft-ui.css",
    "minecraft-ui.min.css",
    "index.js",
    "index.esm.js",
    "minecraft-ui.min.js",
    "index.d.ts"
  ]
}
EOF

echo "✅ Build completed successfully!"
echo ""
echo "Generated files:"
ls -la dist/