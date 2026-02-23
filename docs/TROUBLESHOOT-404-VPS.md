# Troubleshooting 404 on AWS VPS

If you get **404** when opening `http://YOUR_EC2_IP/` (e.g. http://13.53.35.133/), work through these checks on the VPS (SSH in first).

---

## 1. Confirm app directory and build

Your app must run from the directory that contains `package.json`, `server/`, and `vite.config.ts`.

```bash
# If you cloned into ~/Trackademiq-website, go there (or wherever the repo is)
cd ~/Trackademiq-website

# If the repo has the app in a subfolder (e.g. Trackademiq-Webpage), cd into it
# cd Trackademiq-Webpage   # only if package.json is inside a subfolder

# You must see package.json and server/
ls package.json server/index.ts

# Build (creates dist/index.cjs and dist/public/)
npm ci
npm run build

# Check that the client build exists (required for the site to load)
ls dist/public/index.html
# If this fails, the 404 is because the server has no static files to serve.
```

---

## 2. Run the app and test locally on the VPS

```bash
# From the same directory as package.json
export NODE_ENV=production
node dist/index.cjs
# You should see: "serving on port 5000"

# In another terminal (or from your PC with curl):
curl -I http://localhost:5000/
# Should be 200 OK (or 304). If you get 404 here, the Node app is misconfigured.

# Stop the server (Ctrl+C) before continuing.
```

- If `curl http://localhost:5000/` returns **404**: the app is running but not finding `dist/public`. Ensure you ran `npm run build` from the **same** directory that contains `server/` and `vite.config.ts`, and that `dist/public/index.html` exists.
- If the app **crashes** on start with "Could not find the build directory", then `dist/public` is missing — fix the build step above.

---

## 3. Start with PM2 from the correct directory

PM2 must be started from the **app root** (where `dist/` lives).

```bash
cd ~/Trackademiq-website   # or the folder that has dist/
pm2 delete trackademiq 2>/dev/null || true
pm2 start dist/index.cjs --name trackademiq
pm2 save
pm2 logs trackademiq
```

Check logs for errors. Then:

```bash
curl -I http://127.0.0.1:5000/
# Should be 200.
```

---

## 4. Nginx must proxy to port 5000

Nginx should listen on port 80 and proxy to the Node app on 5000.

```bash
# Check Nginx config (path may vary)
sudo cat /etc/nginx/conf.d/trackademiq.conf
# Or:
sudo cat /etc/nginx/sites-enabled/default
```

You want something like:

```nginx
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
```

Then:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

If Nginx is not installed or not running, install/start it:

```bash
sudo apt-get update && sudo apt-get install -y nginx   # Debian/Ubuntu
# or
sudo dnf install -y nginx                               # Amazon Linux
sudo systemctl enable nginx && sudo systemctl start nginx
```

---

## 5. Firewall (security group)

On AWS, the instance **Security Group** must allow:

- **Inbound**: TCP **80** (HTTP), and **22** (SSH) from your IP.

If port 80 is not open, the browser cannot reach Nginx and you may see connection errors or timeouts instead of 404.

---

## 6. Use the correct IP

Your EC2 **Public IP** can change after a stop/start. In the AWS console, check the current public IP of the instance and open:

`http://<current-public-ip>/`

(You mentioned 13.53.35.133; if that’s the current IP, use it. If not, replace with the one shown in the console.)

---

## Quick checklist

| Check | Command / action |
|-------|------------------|
| App directory | `cd` to folder that has `package.json` and `server/` |
| Build | `npm run build` and `ls dist/public/index.html` |
| NODE_ENV | `export NODE_ENV=production` when running Node |
| App runs | `node dist/index.cjs` then `curl http://localhost:5000/` → 200 |
| PM2 | `pm2 start dist/index.cjs --name trackademiq` from app root |
| Nginx | Config proxies `/` to `http://127.0.0.1:5000`, then `sudo nginx -t && sudo systemctl restart nginx` |
| Port 80 | Security group allows inbound TCP 80 |

If all of these are correct, `http://YOUR_EC2_IP/` should return the app (200), not 404.
