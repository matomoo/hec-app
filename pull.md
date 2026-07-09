ssh sadmin 100.73.123.89
cd /var/www/hec-app # ganti sesuai app
git pull origin main
npm install # jalankan jika ada perubahan package.json
npm run build # jalankan jika ada perubahan code
pm2 restart hec-app

git pull origin main
npm run build && pm2 reload hec-app && pm2 save
