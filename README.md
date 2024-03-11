# Gunpla Store
#!/bin/bash
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
sudo groupadd docker
sudo chmod 666 /var/run/docker.sock 
sudo apt-get install -y docker-compose-plugin
sudo apt  install docker-compose
sudo apt install net-tools

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q) 
docker rmi $(docker images -q) 
docker volume rm $(docker volume ls -q)
docker network prune -f

IP=$(dig +short myip.opendns.com @resolver1.opendns.com)
cd Gunpla-Store
echo "BASE_URL=http://$IP" > .env
echo OMISE_PUBLIC_KEY=pkey_test_5yyex97jk6w30bf2yhe > Gunpla-Shop_backend/cmd/myapps/.env
echo OMISE_SECRET_KEY=skey_test_5yyex98g6g5mzezann7 >> Gunpla-Shop_backend/cmd/myapps/.env
echo SECRET_KEY=oak >> Gunpla-Shop_backend/cmd/myapps/.env

docker-compose up -d --build