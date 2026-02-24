# Deploy & run (single guide)

**EC2 IP:** `51.20.34.226`  
**PEM:** `F:/Securityfolder/Trackademiq-website1.pem` (Git Bash). Use `F:\Securityfolder\Trackademiq-website1.pem` in PowerShell.

---

## First-time: go live

### On your PC (Git Bash)

```bash
cd /f/Trackademiq-Webpage/Trackademiq-Webpage
npm install
npm run build
ssh -i "F:/Securityfolder/Trackademiq-website1.pem" ec2-user@51.20.34.226
```

### On EC2

```bash
sudo dnf update -y
sudo dnf install -y nodejs npm git nginx
sudo npm install -g pm2
sudo systemctl enable nginx
sudo systemctl start nginx
cd ~
git clone https://github.com/Trackademiq/Trackademiq-website.git Trackademiq-website
exit
```

### Copy .env (new Git Bash on PC)

```bash
scp -i "F:/Securityfolder/Trackademiq-website1.pem" /f/Trackademiq-Webpage/Trackademiq-Webpage/.env ec2-user@51.20.34.226:~/Trackademiq-website/.env
```

### Back on EC2 (SSH in again)

```bash
cd ~/Trackademiq-website
npm install
npm run build
NODE_ENV=production pm2 start dist/index.cjs --name trackademiq
pm2 save
pm2 startup
```
Run the command it prints (the `sudo env ...` line), then `pm2 save` again.

```bash
curl -I http://127.0.0.1:5000/
```
Must see `200 OK`.

### Nginx config

```bash
sudo tee /etc/nginx/conf.d/trackademiq.conf << 'EOF'
server {
    listen 80;
    server_name trackademiq.com www.trackademiq.com _;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
sudo nginx -t
sudo systemctl restart nginx
```

Open **http://51.20.34.226**. In AWS Security Group allow **Inbound** TCP **80**, **443**, **22** from **0.0.0.0/0** if needed.

---

## Domain (trackademiq.com)

**DNS (Hostinger):** A record `@` and `www` → **51.20.34.226**.  
**Check:** `nslookup trackademiq.com` should show 51.20.34.226.

---

## HTTPS (Let's Encrypt)

On EC2, port 443 open in Security Group:

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d trackademiq.com -d www.trackademiq.com --non-interactive --agree-tos -m your@email.com
sudo nginx -t
sudo systemctl reload nginx
```
Replace `your@email.com`. Then open **https://trackademiq.com**.

If certbot said "certificate saved but could not install", add `server_name trackademiq.com www.trackademiq.com;` in the `server { listen 80; }` block in `/etc/nginx/conf.d/trackademiq.conf`, then:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot install --cert-name trackademiq.com
sudo systemctl reload nginx
```

---

## Update code (on EC2)

```bash
cd ~/Trackademiq-website
git pull
npm install
npm run build
pm2 restart trackademiq
pm2 save
```

---

## Troubleshooting 404

- **App dir:** `cd ~/Trackademiq-website`, then `npm run build`, then `ls dist/public/index.html`.
- **PM2:** `pm2 delete trackademiq 2>/dev/null; pm2 start dist/index.cjs --name trackademiq` from app root. `curl -I http://127.0.0.1:5000/` → 200.
- **Nginx:** `location /` must `proxy_pass http://127.0.0.1:5000;`. Then `sudo nginx -t && sudo systemctl restart nginx`.
- **Security Group:** Inbound TCP 80 (and 22 for SSH). EC2 public IP can change after stop/start — use the IP shown in AWS console.

---

## New PEM key (one-time)

1. Create new key in AWS, download `.pem`, put in e.g. `F:/Securityfolder/newkey.pem`.
2. On PC: `ssh-keygen -y -f "F:/Securityfolder/newkey.pem"` → copy the line.
3. SSH to EC2 (with old key or EC2 Instance Connect), then: `echo "PASTE_LINE" >> ~/.ssh/authorized_keys`.
4. From PC test: `ssh -i "F:/Securityfolder/newkey.pem" ec2-user@51.20.34.226`. Then remove old key line from `~/.ssh/authorized_keys` on EC2.

---

## Port 5000 in use on PC (PowerShell)

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```
