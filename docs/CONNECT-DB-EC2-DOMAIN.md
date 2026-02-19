# Connect database (Supabase) + Host on AWS EC2 + Use your Hostinger domain

Step-by-step: connect Supabase, deploy the app on EC2, and point your Hostinger domain to EC2.

---

## Part 1 — Connect the database (Supabase)

### 1.1 Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. **New project** → choose org, name (e.g. `trackademiq`), database password (save it), region.
3. Wait until the project is ready.

### 1.2 Get the connection string

1. In the Supabase dashboard: **Project Settings** (gear) → **Database**.
2. Under **Connection string** choose **URI**.
3. Copy the URI. It looks like:
   ```text
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with the database password you set when creating the project.
5. For this app, **Transaction** mode (port **6543**) or **Session** (port **5432**) both work. If you use **5432**, change the port in the URI accordingly.

### 1.3 Configure the app

**On your local machine (for dev and for running `db:push`):**

1. In the project folder, copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set:
   ```env
   DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   PORT=5000
   ```
3. Install and push the schema so tables exist in Supabase:
   ```bash
   npm install
   npm run db:push
   ```
4. Run the app; it will use Supabase when `DATABASE_URL` is set:
   ```bash
   npm run dev
   ```

**On EC2** you will set `DATABASE_URL` in the environment there too (see Part 2).

---

## Part 2 — Host on AWS EC2

### 2.1 Launch an EC2 instance

1. In **AWS Console** → **EC2** → **Launch instance**.
2. **Name:** e.g. `trackademiq-web`.
3. **AMI:** Amazon Linux 2023 or Ubuntu 22.04.
4. **Instance type:** `t2.micro` or `t3.micro` (free tier).
5. **Key pair:** Create or select one; download the `.pem` and keep it safe.
6. **Network / Security group:**  
   - Create or use a security group that allows:
     - **SSH (22)** from your IP (or 0.0.0.0/0 only if you understand the risk).
     - **HTTP (80)** from 0.0.0.0/0.
     - **HTTPS (443)** from 0.0.0.0/0 (for SSL later).
7. Launch the instance and note the **Public IPv4 address** (e.g. `3.110.xxx.xxx`).

### 2.2 Connect and install Node.js

From your computer (PowerShell or terminal):

```bash
# Use your key and EC2 address (e.g. ec2-user for Amazon Linux, ubuntu for Ubuntu)
ssh -i "path\to\your-key.pem" ec2-user@YOUR_EC2_PUBLIC_IP
```

On the EC2 instance:

**Amazon Linux 2023:**

```bash
sudo dnf install -y nodejs npm git
node -v   # should be v18+
```

**Ubuntu 22.04:**

```bash
sudo apt update && sudo apt install -y nodejs npm git
# If Node is too old, use NodeSource:
# curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
# sudo apt install -y nodejs
node -v
```

### 2.3 Deploy the app on EC2

On the EC2 instance:

```bash
# Clone your repo (replace with your repo URL)
cd ~
git clone https://github.com/YOUR_USER/Trackademiq-Webpage.git
cd Trackademiq-Webpage
```

Create `.env` on the server with **production** values:

```bash
nano .env
```

Add (use your real Supabase URI and a strong port if you change it):

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

Save (Ctrl+O, Enter, Ctrl+X). Then:

```bash
npm ci
npm run build
npm run start
```

Test from your browser: `http://YOUR_EC2_PUBLIC_IP:5000`.  
To run the app in the background and survive logout, use **pm2**:

```bash
sudo npm install -g pm2
pm2 start dist/index.cjs --name trackademiq
pm2 save
pm2 startup   # run the command it prints so it starts on reboot
```

Now the app runs on port 5000. Next step is to put Nginx in front so you can use port 80/443 and your domain.

---

## Part 3 — Point your Hostinger domain to EC2

You have a domain in **Hostinger**. We’ll point it to your EC2 public IP and (optionally) add HTTPS with Nginx on EC2.

### 3.1 DNS in Hostinger

1. Log in to **Hostinger** → **Domains** → select your domain.
2. Open **DNS / Name Servers** or **Manage DNS**.
3. Add or edit an **A** record:
   - **Type:** A  
   - **Name:** `@` (for root, e.g. `yourdomain.com`) or `www` (for `www.yourdomain.com`).  
   - **Points to / Value:** your EC2 **Public IPv4 address** (e.g. `3.110.xxx.xxx`).  
   - **TTL:** 300 or default.
4. If you want both `yourdomain.com` and `www.yourdomain.com`:
   - One A record: Name `@`, value = EC2 IP.
   - Another A record: Name `www`, value = EC2 IP.
5. Save. DNS can take 5–30 minutes to propagate.

### 3.2 Nginx on EC2 (so domain works on port 80)

SSH into EC2 again and install Nginx:

**Amazon Linux 2023:**

```bash
sudo dnf install -y nginx
```

**Ubuntu:**

```bash
sudo apt install -y nginx
```

Create a site config (replace `yourdomain.com` with your real domain):

```bash
sudo nano /etc/nginx/conf.d/trackademiq.conf
```

Paste (replace `yourdomain.com` and keep `5000` if your app runs on 5000):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
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

Save, then:

```bash
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
```

Open **http://yourdomain.com** in the browser. It should show your app.

### 3.3 HTTPS (SSL) with Let’s Encrypt (optional)

On EC2:

```bash
# Amazon Linux 2023
sudo dnf install -y certbot python3-certbot-nginx
# Ubuntu
# sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts (email, agree to terms). Certbot will configure HTTPS in Nginx. After that, use **https://yourdomain.com**.

---

## Quick reference

| Step | Where | What |
|------|--------|------|
| DB | Supabase dashboard | Create project → Settings → Database → Connection string (URI). |
| App env | Local & EC2 `.env` | `DATABASE_URL=...`, `PORT=5000`. |
| Schema | Local (or EC2 once) | `npm run db:push` so tables exist in Supabase. |
| EC2 | AWS Console | Launch instance, open 22, 80, 443. |
| Deploy | EC2 | Clone repo, `.env`, `npm ci && npm run build`, `pm2 start dist/index.cjs`. |
| Domain | Hostinger | A record: `@` and/or `www` → EC2 public IP. |
| Web server | EC2 | Nginx on 80/443, proxy to `http://127.0.0.1:5000`. |
| SSL | EC2 | `certbot --nginx -d yourdomain.com -d www.yourdomain.com`. |

After this, your app uses **Supabase** as the database, runs on **EC2**, and is reachable at your **Hostinger** domain (and HTTPS if you ran Certbot).
