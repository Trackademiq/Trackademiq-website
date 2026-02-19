# Deploy to your EC2 in one go

**Your EC2:** `13.51.106.59`  
**SSH key:** `F:\Trackademiq-Webpage\Trackademiq-Webpage\trackademiq-web.pem`  
**Repo:** https://github.com/Trackademiq/Trackademiq-website

---

## 1. Push the deploy script to GitHub

From your PC, in the project folder (where the script was added):

```powershell
cd F:\Trackademiq-Webpage\Trackademiq-Webpage
git add deploy-on-ec2.sh docs/RUN-DEPLOY-NOW.md
git commit -m "Add EC2 deploy script"
git remote -v
```

If your remote is not `Trackademiq-website`, add it and push:

```powershell
git remote add origin https://github.com/Trackademiq/Trackademiq-website.git
git branch -M main
git push -u origin main
```

If the repo already exists and has other content, just push:

```powershell
git push origin main
```

---

## 2. SSH into EC2

```powershell
ssh -i "F:\Trackademiq-Webpage\Trackademiq-Webpage\trackademiq-web.pem" ec2-user@13.51.106.59
```

---

## 3. Run the deploy script on EC2

After you are logged in (you see something like `[ec2-user@ip-xxx ~]$`):

```bash
curl -sO https://raw.githubusercontent.com/Trackademiq/Trackademiq-website/main/deploy-on-ec2.sh
chmod +x deploy-on-ec2.sh
./deploy-on-ec2.sh
```

**Or** if the script is already in the repo and you prefer to clone first:

```bash
git clone https://github.com/Trackademiq/Trackademiq-website.git
cd Trackademiq-website
chmod +x deploy-on-ec2.sh
./deploy-on-ec2.sh
```

When the script says “Copy .env from your PC”, open a **new** PowerShell on your PC (keep SSH open) and run:

```powershell
scp -i "F:\Trackademiq-Webpage\Trackademiq-Webpage\trackademiq-web.pem" F:\Trackademiq-Webpage\Trackademiq-Webpage\.env ec2-user@13.51.106.59:~/Trackademiq-website/.env
```

Then go back to the SSH window and press **Enter** to continue.

---

## 4. Open your site

In the browser: **http://13.51.106.59**

---

## 5. (Optional) Use your domain and HTTPS

- In **Hostinger** DNS, set **A** records for `@` and `www` to **13.51.106.59**.
- On EC2, edit Nginx and run certbot:

```bash
sudo nano /etc/nginx/conf.d/trackademiq.conf
# Change: server_name _;  to:  server_name yourdomain.com www.yourdomain.com;
sudo nginx -t && sudo systemctl reload nginx
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Then open **https://yourdomain.com**.
