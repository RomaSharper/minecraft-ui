#!/bin/bash
echo "🎮 Initializing MinecraftUI Core package..."

# Create directory structure
mkdir -p src/{scss/{core,base,components,utilities,themes},js,types}
mkdir -p dist
mkdir -p tests

echo "📁 Created directory structure"

# Create SCSS structure
touch src/scss/core/{_variables.scss,_mixins.scss,_functions.scss}
touch src/scss/base/{_reset.scss,_typography.scss,_animations.scss}
touch src/scss/components/{_buttons.scss,_cards.scss,_forms.scss,_navigation.scss,_modals.scss,_progress.scss,_tabs.scss,_inventory.scss,_tooltips.scss,_toasts.scss}
touch src/scss/utilities/{_spacing.scss,_typography.scss,_colors.scss,_layout.scss,_responsive.scss}
touch src/scss/themes/{_default.scss,_dark.scss,_neon.scss}
touch src/scss/minecraft-ui.scss

echo "🎨 Created SCSS files"

# Create JS structure
touch src/js/{dom.ts,theme.ts,validation.ts,events.ts}
touch src/index.ts
touch src/types/index.ts

echo "⚡ Created TypeScript files"

# Create test files
touch tests/{dom.test.ts,theme.test.ts,validation.test.ts}

echo "🧪 Created test files"

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "⚠️  package.json not found. Please create it first."
fi

echo "✅ MinecraftUI Core package initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Fill in the SCSS and TypeScript files with the provided code"
echo "2. Run 'npm run build' to build the package"
echo "3. Run 'npm run watch' for development"