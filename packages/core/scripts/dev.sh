#!/bin/bash
# Development script for MinecraftUI Core

echo "🚀 Starting MinecraftUI Core development server..."

# Check if concurrently is installed
if ! command -v concurrently &> /dev/null; then
    echo "Installing concurrently..."
    npm install -g concurrently
fi

# Start development watchers
echo "👀 Starting file watchers..."
concurrently \
    --prefix "{name}" \
    --names "SCSS,TS,TEST" \
    --prefix-colors "blue,green,yellow" \
    "sass src/scss/minecraft-ui.scss dist/minecraft-ui.css --style=expanded --source-map --watch" \
    "tsc --watch" \
    "npm run test -- --watch"

# packages/core/scripts/test.sh
#!/bin/bash
# Test script for MinecraftUI Core

echo "🧪 Running MinecraftUI Core tests..."

# Run Jest tests
jest --coverage --verbose

if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Some tests failed"
    exit 1
fi

# Run SCSS lint
echo "🎨 Linting SCSS..."
stylelint "src/scss/**/*.scss"

if [ $? -eq 0 ]; then
    echo "✅ SCSS linting passed!"
else
    echo "❌ SCSS linting failed"
    exit 1
fi

# Run TypeScript lint
echo "⚡ Linting TypeScript..."
eslint "src/**/*.ts"

if [ $? -eq 0 ]; then
    echo "✅ TypeScript linting passed!"
else
    echo "❌ TypeScript linting failed"
    exit 1
fi

echo "🎉 All tests and linting passed!"

# Make scripts executable
chmod +x packages/core/scripts/*.sh