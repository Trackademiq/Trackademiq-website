# Deploy Trackademiq – Commands Start to End

Run these in order. Replace placeholders where noted.

---

## Part 1: On your local PC (Windows)

### 1.1 Open terminal and go to project root

**PowerShell or CMD:**
```powershell
cd F:\Trackademiq-Webpage\Trackademiq-Webpage
```

**Git Bash:**
```bash
cd /f/Trackademiq-Webpage/Trackademiq-Webpage
```

### 1.2 Install dependencies

```powershell
npm install
```

### 1.3 Create .env (if not exists)

```powershell
copy .env.example .env
```

Then edit `.env` and set `PORT=5000` and `DATABASE_URL` if you use Supabase.

### 1.4 Build the app

```powershell
npm run build
```

### 1.5 (Optional) Free port 5000 if already in use

```powershell
netstat -ano | findstr :5000
```

Note the last number (PID). Then (replace `12345` with that PID):

```powershell
taskkill /PID 12345 /F
```

### 1.6 Run the app locally

```powershell
npm run start
```

You should see: `serving on port 5000`. Open http://localhost:5000

To stop: `Ctrl+C`.

---

## Part 2: Copy .env and key to EC2 (from your PC)

Use your EC2 public IP (e.g. `13.53.35.133`) and your `.pem` path.

### 2.1 Copy .env to EC2

**PowerShell (run from project folder or use full paths):**
```powershell
scp -i "F:\Trackademiq-Webpage\Trackademiq-Webpage\trackademiq-website.pem" "F:\Trackademiq-Webpage\Trackademiq-Webpage\.env" ec2-user@13.53.35.133:~/Trackademiq-website/.env
```

Replace `13.53.35.133` with your EC2 public IP if different.

### 2.2 (Optional) Copy .pem to a short path for SSH

You can keep using the full path, or copy the key to your user folder and use it for SSH.

---

## Part 3: SSH into EC2 (from your PC)

### 3.1 Connect to EC2

**PowerShell / CMD:**
```powershell
ssh -i "F:\Trackademiq-Webpage\Trackademiq-Webpage\trackademiq-website.pem" ec2-user@13.53.35.133
```

Replace the IP if yours is different. After this, all commands run **on the EC2 server**.

---

## Part 4: On EC2 – First-time setup (install Node, git, Nginx)

Run these **once** on a new EC2 instance.

### 4.1 Update system (Amazon Linux 2023)

```bash
sudo dnf update -y
```

### 4.2 Install Node.js 20, git, Nginx (Amazon Linux)

```bash
sudo dnf install -y nodejs npm git nginx
```

**If you use Ubuntu instead:**
```bash
sudo apt-get update -y
sudo apt-get install -y nodejs npm git nginx
```

### 4.3 Install PM2 globally

```bash
sudo npm install -g pm2
```

### 4.4 Start and enable Nginx

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## Part 5: On EC2 – Clone repo and build app

### 5.1 Go to home directory

```bash
cd ~
```

### 5.2 Clone the repo (first time only)

```bash
git clone https://github.com/Trackademiq/Trackademiq-website.git Trackademiq-website
```

If the repo is private, use a personal access token or SSH key.

### 5.3 Go into the app directory

```bash
cd ~/Trackademiq-website
```

**If your repo has the app inside a subfolder (e.g. `Trackademiq-Webpage`), then:**
```bash
cd ~/Trackademiq-website/Trackademiq-Webpage
```

Use the directory that contains `package.json` and `server/`.

### 5.4 Pull latest code (when you update later)

```bash
git pull
```

### 5.5 Copy .env from your PC (if not done in Part 2)

If you didn’t run the `scp` command earlier, run it from your **PC** (Part 2.1), then continue here.

### 5.6 Install dependencies on EC2

```bash
npm install
```

### 5.7 Build the app

```bash
npm run build
```

### 5.8 Check that build output exists

```bash
ls -la dist/index.cjs dist/public/index.html
```

Both should exist. If `dist/public/index.html` is missing, the build failed or you’re in the wrong directory.

---

## Part 6: On EC2 – Run app with PM2

### 6.1 Ensure you are in the app root (where `dist/` is)

```bash
cd ~/Trackademiq-website
```

(Or `cd ~/Trackademiq-website/Trackademiq-Webpage` if that’s your app root.)

### 6.2 Set production mode

```bash
export NODE_ENV=production
```

### 6.3 Remove old PM2 process (if any)

```bash
pm2 delete trackademiq 2>/dev/null || true
```

### 6.4 Start the app with PM2

```bash
pm2 start dist/index.cjs --name trackademiq
```

### 6.5 Save PM2 process list

```bash
pm2 save
```

### 6.6 Set PM2 to start on reboot (optional)

```bash
pm2 startup
```

Run the command it prints (the `sudo env ...` line), then:

```bash
pm2 save
```

### 6.7 Check app is running

```bash
pm2 status
```

You should see `trackademiq` with status `online`.

### 6.8 Test that the app responds on the server

```bash
curl -I http://127.0.0.1:5000/
```

You should see `HTTP/1.1 200 OK`. If you see “Connection refused”, the app isn’t listening on 5000 (check `pm2 logs trackademiq`).

---

## Part 7: On EC2 – Configure Nginx

### 7.1 Create Nginx config for the app

```bash
sudo tee /etc/nginx/conf.d/trackademiq.conf << 'EOF'
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
EOF
```

### 7.2 Test Nginx config

```bash
sudo nginx -t
```

### 7.3 Restart Nginx

```bash
sudo systemctl restart nginx
```

### 7.4 Check Nginx is running

```bash
sudo systemctl status nginx
```

---

## Part 8: On EC2 – Open firewall (AWS Security Group)

In **AWS Console** → EC2 → your instance → **Security** → Security group:

1. **Edit inbound rules**
2. **Add rule:** Type = HTTP, Port = 80, Source = 0.0.0.0/0 (or your IP)
3. Save

---

## Part 9: Test from browser

Open in your browser (use your EC2 public IP):

```
http://13.53.35.133
```

Replace with your instance’s public IP if different. You should see the Trackademiq site.

---

## Quick reference – Update app on EC2 (after code changes)

Run these on EC2 after you push new code:

```bash
cd ~/Trackademiq-website
git pull
npm install
npm run build
pm2 restart trackademiq
pm2 save
```

---

## Troubleshooting

| Problem | Command / check |
|--------|------------------|
| Port 5000 in use (local) | `netstat -ano \| findstr :5000` then `taskkill /PID <pid> /F` |
| App not listening on EC2 | `pm2 logs trackademiq` and `ls dist/public/index.html` |
| 404 on EC2 | See `docs/TROUBLESHOOT-404-VPS.md` |
| Nginx not starting | `sudo nginx -t` and `sudo systemctl status nginx` |
