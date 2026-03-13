#!/bin/bash
set -x

echo "🚀 Starting deployment..."

mkdir -p app
cd app || exit

if [ -d "repo/.git" ]; then
  echo "📦 Repo exists, pulling latest code..."
  cd repo || exit
  git pull
else
  echo "📥 Cloning repository..."
  git clone https://github.com/ianshpwr/BhonuBaba.git repo
  cd repo || exit
fi

cd server || exit

echo "📦 Installing dependencies..."
npm install

echo "⚙️ Building project..."
npm run build

echo "✅ Deployment complete!"
