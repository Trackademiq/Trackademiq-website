#!/bin/bash
# Run this script ON your EC2 instance after SSH.
# Usage: chmod +x deploy-on-ec2.sh && ./deploy-on-ec2.sh

set -e
REPO_URL="https://github.com/Trackademiq/Trackademiq-website.git"
APP_DIR="$HOME/Trackademiq-website"
NGINX_CONF="/etc/nginx/conf.d/trackademiq.conf"

echo "=== Step 1: Install Node.js, git, nginx ==="
if command -v dnf &>/dev/null; then
  sudo dnf install -y nodejs npm git nginx
elif command -v apt-get &>/dev/null; then
  sudo apt-get update -y
  sudo apt-get install -y nodejs npm git nginx
else
  echo "Unknown package manager. Install nodejs, npm, git, nginx manually."
  exit 1
fi

echo "=== Step 2: Clone repo ==="
cd "$HOME"
if [ -d "Trackademiq-website" ]; then
  echo "Directory exists, pulling latest..."
  cd Trackademiq-website && git pull
else
  git clone "$REPO_URL" Trackademiq-website
  cd Trackademiq-website
fi

echo "=== Step 3: .env ==="
if [ ! -f .env ] || ! grep -q "DATABASE_URL=postgresql" .env 2>/dev/null; then
  echo ""
  echo "Copy .env from your PC (run this in a NEW PowerShell on your PC):"
  echo '  scp -i "F:\Trackademiq-Webpage\Trackademiq-Webpage\trackademiq-web.pem" F:\Trackademiq-Webpage\Trackademiq-Webpage\.env ec2-user@13.51.106.59:~/Trackademiq-website/.env'
  echo ""
  read -r -p "After you ran the scp command above, press Enter here to continue..."
fi

echo "=== Step 4: Install deps, build, start with PM2 ==="
npm ci
npm run build
sudo npm install -g pm2 2>/dev/null || true
pm2 delete trackademiq 2>/dev/null || true
pm2 start dist/index.cjs --name trackademiq
pm2 save
pm2 startup | tail -1 | bash 2>/dev/null || true
pm2 save

echo "=== Step 5: Nginx config ==="
sudo tee "$NGINX_CONF" > /dev/null << 'NGINX'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

sudo nginx -t && sudo systemctl enable nginx && sudo systemctl restart nginx

echo ""
echo "=== Done. Your site should be at: http://13.51.106.59 ==="
echo "To use your domain: edit Nginx config: sudo nano $NGINX_CONF"
echo "  Change 'server_name _;' to 'server_name yourdomain.com www.yourdomain.com;'"
echo "  Then: sudo nginx -t && sudo systemctl reload nginx"
echo "Point your Hostinger domain A record to 13.51.106.59"
