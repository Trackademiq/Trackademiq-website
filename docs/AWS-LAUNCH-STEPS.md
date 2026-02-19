# Step-by-step: Launch Trackademiq website on AWS

Follow these steps in order. You already have Supabase and `.env` with `DATABASE_URL` set locally.

---

## Step 1 — Push your code to GitHub (if not already)

1. Create a repo on [GitHub](https://github.com/new) (e.g. `Trackademiq-Webpage`).
2. On your PC, in the project folder:
   ```powershell
   cd F:\Trackademiq-Webpage\Trackademiq-Webpage
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/Trackademiq-Webpage.git
   git branch -M main
   git push -u origin main
   ```
3. Note the repo URL; you’ll use it on EC2 to clone.

---

## Step 2 — Launch an EC2 instance on AWS

1. Log in to [AWS Console](https://console.aws.amazon.com/) → open **EC2**.
2. Click **Launch instance**.
3. Set:
   - **Name:** `trackademiq-web`
   - **AMI:** **Amazon Linux 2023** (or **Ubuntu 22.04**)
   - **Instance type:** **t2.micro** (free tier) or **t3.micro**
   - **Key pair:** **Create new key pair** → name e.g. `trackademiq-key` → download the `.pem` file and keep it somewhere safe (e.g. `C:\Users\YourName\.ssh\trackademiq-key.pem`).
   - **Network settings:** **Create security group** and allow:
     - **SSH** (22) — source: **My IP** (or **Anywhere** only if you accept the risk)
     - **HTTP** (80) — source: **Anywhere** (0.0.0.0/0)
     - **HTTPS** (443) — source: **Anywhere** (0.0.0.0/0)
4. Click **Launch instance**.
5. In EC2 → **Instances** → select your instance → copy the **Public IPv4 address** (e.g. `13.234.xxx.xxx`). This is your server IP.

---

## Step 3 — Connect to EC2 from your PC

**On Windows (PowerShell):**

```powershell
# Replace with your key path and your EC2 public IP
ssh -i "C:\path\to\trackademiq-key.pem" ec2-user@YOUR_EC2_PUBLIC_IP
```

- For **Amazon Linux** the user is `ec2-user`.
- For **Ubuntu** the user is `ubuntu`:  
  `ssh -i "C:\path\to\trackademiq-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP`

Type `yes` if asked about host key. You should land on the EC2 terminal.

---

## Step 4 — Install Node.js and git on EC2

**If you chose Amazon Linux 2023:**

```bash
sudo dnf install -y nodejs npm git
node -v
```

**If you chose Ubuntu 22.04:**

```bash
sudo apt update && sudo apt install -y nodejs npm git
node -v
```

If Node is older than 18, on Ubuntu you can install Node 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

---

## Step 5 — Clone your repo and add `.env`

Still on EC2 (SSH session):

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/Trackademiq-Webpage.git
cd Trackademiq-Webpage
```

Create the production `.env` file:

```bash
nano .env
```

Paste this (replace the `DATABASE_URL` with your real Supabase URI; encode `@` in password as `%40`):

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres.edrkzgexkzdpxbkucstr:Htimfc%401994!@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
```

Save and exit: **Ctrl+O**, **Enter**, **Ctrl+X**.

---

## Step 6 — Build and run the app

On EC2, in `~/Trackademiq-Webpage`:

```bash
npm ci
npm run build
npm run start
```

Open in your browser: **http://YOUR_EC2_PUBLIC_IP:5000**  
You should see your site. Stop the server with **Ctrl+C** for the next step.

---

## Step 7 — Run the app in the background with PM2

So the app keeps running after you close SSH:

```bash
sudo npm install -g pm2
pm2 start dist/index.cjs --name trackademiq
pm2 save
pm2 startup
```

Run the command that `pm2 startup` prints (it will look like `sudo env PATH=...`). Then:

```bash
pm2 save
```

The app now runs on port 5000 and restarts on reboot.

---

## Step 8 — Install Nginx (so the site works on port 80)

**Amazon Linux 2023:**

```bash
sudo dnf install -y nginx
```

**Ubuntu:**

```bash
sudo apt install -y nginx
```

Create the site config (replace `yourdomain.com` with your real domain, or use the EC2 IP for now):

```bash
sudo nano /etc/nginx/conf.d/trackademiq.conf
```

Paste (change `yourdomain.com` to your domain, or use `_` to accept any host for testing):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com _;
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

Save: **Ctrl+O**, **Enter**, **Ctrl+X**. Then:

```bash
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
```

Test in the browser: **http://YOUR_EC2_PUBLIC_IP** (no `:5000`). You should see your site.

---

## Step 9 — Point your Hostinger domain to EC2

1. Log in to **Hostinger** → **Domains** → select your domain.
2. Open **DNS / Manage DNS**.
3. Add or edit **A** records:
   - **Name:** `@`  → **Value:** your EC2 **Public IPv4 address** (e.g. `13.234.xxx.xxx`).
   - **Name:** `www` → **Value:** same EC2 IP.
4. Save. Wait 5–30 minutes for DNS to propagate.
5. On EC2, edit the Nginx config and set your real domain:
   ```bash
   sudo nano /etc/nginx/conf.d/trackademiq.conf
   ```
   Change `server_name yourdomain.com www.yourdomain.com _;` to your actual domain (e.g. `trackademiq.com www.trackademiq.com`).
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```
6. Open **http://yourdomain.com** in the browser.

---

## Step 10 — Add HTTPS (SSL) with Let’s Encrypt (optional)

On EC2, install Certbot and get a certificate (replace with your domain):

**Amazon Linux 2023:**

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Ubuntu:**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts (email, agree to terms). Certbot will configure HTTPS. After that, use **https://yourdomain.com**.

---

## Quick checklist

| Step | What you did |
|------|------------------|
| 1 | Code on GitHub |
| 2 | EC2 instance launched (t2.micro, key pair, security group 22/80/443) |
| 3 | SSH into EC2 |
| 4 | Node.js + git installed |
| 5 | Repo cloned, `.env` with `DATABASE_URL` and `PORT=5000` |
| 6 | `npm ci` → `npm run build` → `npm run start` (test on :5000) |
| 7 | PM2: `pm2 start dist/index.cjs` + `pm2 save` + `pm2 startup` |
| 8 | Nginx installed, config added, `nginx -t` and restart → site on port 80 |
| 9 | Hostinger A record @ and www → EC2 IP, then set `server_name` in Nginx |
| 10 | (Optional) `certbot --nginx` for HTTPS |

If something fails, check: security group allows 80/443, PM2 is running (`pm2 status`), Nginx is running (`sudo systemctl status nginx`), and `.env` has the correct `DATABASE_URL`.
