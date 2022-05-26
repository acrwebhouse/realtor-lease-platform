sudo docker stop realtor-lease-platform
sudo docker rm realtor-lease-platform
rm -rf code
mkdir code
cd code
git clone https://github.com/acrwebhouse/realtor-lease-platform.git
cd realtor-lease-platform
git checkout -b alpha origin/alpha
sudo docker build . -t acrwebdev/realtor-lease-platform:0.0.1
sudo docker push acrwebdev/realtor-lease-platform:0.0.1
sudo docker run -p 8080:3000 --restart=always --name=realtor-lease-platform -d acrwebdev/realtor-lease-platform:0.0.1