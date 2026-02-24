# Go live – exact commands (copy-paste)

Run in order. Use **Git Bash** on Windows for the PC steps.

---

## SECTION A: On your PC (Git Bash)

**1. Go to project folder**
```bash
cd /f/Trackademiq-Webpage/Trackademiq-Webpage
```

**2. Install dependencies**
```bash
npm install
```

**3. Build**
```bash
npm run build
```

**4. SSH into EC2**
```bash
ssh -i /f/Trackademiq-Webpage/Trackademiq-Webpage/trackademiq-website.pem ec2-user@13.53.35.133
```

After this you are on the server. Run SECTION B.

---

## SECTION B: On EC2 (after SSH)

**5. Update system**
```bash
sudo dnf update -y
```

**6. Install Node, git, Nginx**
```bash
sudo dnf install -y nodejs npm git nginx
```

**7. Install PM2**
```bash
sudo npm install -g pm2
```

**8. Enable and start Nginx**
```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

**9. Go to home**
```bash
cd ~
```

**10. Clone repo**
```bash
git clone https://github.com/Trackademiq/Trackademiq-website.git Trackademiq-website
```

**11. Enter app folder**
```bash
cd ~/Trackademiq-website
```

**12. Copy .env from your PC**  
Open a **new** Git Bash on your PC and run (folder on EC2 now exists):
```bash
scp -i /f/Trackademiq-Webpage/Trackademiq-Webpage/trackademiq-website.pem /f/Trackademiq-Webpage/Trackademiq-Webpage/.env ec2-user@13.53.35.133:~/Trackademiq-website/.env
```
Then go back to your EC2 terminal.

**13. Install dependencies**
```bash
npm install
```

**14. Build**
```bash
npm run build
```

**15. Check build**
```bash
ls -la dist/index.cjs dist/public/index.html
```

**16. Set production**
```bash
export NODE_ENV=production
```

**17. Remove old PM2 app (if any)**
```bash
pm2 delete trackademiq 2>/dev/null || true
```

**18. Start app with PM2**
```bash
pm2 start dist/index.cjs --name trackademiq
```

**19. Save PM2 list**
```bash
pm2 save
```

**20. Enable PM2 on reboot**
```bash
pm2 startup
```
Run the single command it prints (the line starting with `sudo env`), then run:
```bash
pm2 save
```

**21. Test app on server**
```bash
curl -I http://127.0.0.1:5000/
```
You must see `HTTP/1.1 200 OK`.

**22. Create Nginx config**
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

**23. Test Nginx**
```bash
sudo nginx -t
```

**24. Restart Nginx**
```bash
sudo systemctl restart nginx
```

**25. Open in browser**
```
http://13.53.35.133
```
In AWS Security Group for this instance, allow **Inbound** **TCP** **80** from **0.0.0.0/0** if not already done.

---

## If IP works but trackademiq.com shows "refused to connect"

The domain must point to your EC2 IP. Do this:

**A. In Hostinger (DNS / Nameservers):**
1. Open your domain **trackademiq.com** → **DNS / DNS Zone** (or **Manage DNS**).
2. Add or edit **A** records:
   - **Name:** `@` (or leave blank for root) → **Value / Points to:** `13.53.35.133`
   - **Name:** `www` → **Value / Points to:** `13.53.35.133`
3. Remove any other A records for `@` or `www` that point to a different IP.
4. Save. DNS can take 5–60 minutes to update.

**B. On EC2 – tell Nginx to accept your domain**

SSH in, then run:
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

**C. Check DNS from your PC (Git Bash or PowerShell):**
```bash
nslookup trackademiq.com
```
The answer should show **13.53.35.133**. If it shows a different IP, wait for DNS or fix the A record in Hostinger.

Then open: **http://trackademiq.com**

---

## Enable HTTPS (free SSL with Let's Encrypt)

Do this **on EC2** after HTTP works. You need port **443** open in the AWS Security Group (Inbound rule: TCP 443, 0.0.0.0/0).

**1. Open port 443 in AWS**  
EC2 → Security Groups → your instance’s group → Edit inbound rules → Add rule: **HTTPS**, port **443**, Source **0.0.0.0/0** → Save.

**2. Install Certbot (Amazon Linux 2023)**

```bash
sudo dnf install -y certbot python3-certbot-nginx
```

If that fails (package not found), try:
```bash
sudo dnf install -y epel-release
sudo dnf install -y certbot python3-certbot-nginx
```

**3. Get the certificate**

Use your real email so Let’s Encrypt can send expiry notices:
```bash
sudo certbot --nginx -d trackademiq.com -d www.trackademiq.com --non-interactive --agree-tos -m your@email.com
```
Replace `your@email.com` with your email. Certbot will adjust your Nginx config and add HTTPS.

**4. Test Nginx and reload**

```bash
sudo nginx -t
sudo systemctl reload nginx
```

**5. Test HTTPS**

Open **https://trackademiq.com** in the browser. Certbot sets up auto-renewal; to test renewal:
```bash
sudo certbot renew --dry-run
```

---

## When you update code later (on EC2)

```bash
cd ~/Trackademiq-website
git pull
npm install
npm run build
pm2 restart trackademiq
pm2 save
```

---

## Deploy only the blog (no full app deploy)

Blog content is loaded at runtime from `blog-posts.json`. To update only the blog:

**1. On your PC:** edit posts in `client/src/pages/blog.tsx` (the `blogPosts` array), then export JSON and build once so the file is in `dist/public/`:

```bash
cd /f/Trackademiq-Webpage/Trackademiq-Webpage
npm run export:blog
npm run build
```

**2. Copy only the blog file to EC2** (no `git pull`, no `pm2 restart`):

```bash
scp -i /f/Trackademiq-Webpage/Trackademiq-Webpage/trackademiq-website.pem /f/Trackademiq-Webpage/Trackademiq-Webpage/dist/public/blog-posts.json ec2-user@13.53.35.133:~/Trackademiq-website/dist/public/blog-posts.json
```

If your built app lives elsewhere on EC2, adjust the path after `13.53.35.133:` to match (e.g. the same path where `index.html` is served from).

After this, the live site will show the new blog content on next page load. To add or edit posts in the future, edit `blog.tsx`, run `npm run export:blog` and `npm run build`, then `scp` only `dist/public/blog-posts.json` to the server as above.

---

## If port 5000 is in use on your PC (before step 3)

In **PowerShell** (not Git Bash):

```powershell
netstat -ano | findstr :5000
```
Note the last number (PID). Then:

```powershell
taskkill /PID 12345 /F
```
Use the real PID instead of `12345`.
