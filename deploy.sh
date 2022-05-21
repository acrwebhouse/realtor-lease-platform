sudo docker stop realtor-lease-platform
sudo docker rm realtor-lease-platform
rm -rf code
mkdir code
cd code
git clone git@github.com:acrwebhouse/realtor-lease-platform.git
cd realtor-lease-platform
git checkout -b develop origin/develop
sudo docker build . -t acrwebdev/realtor-lease-platform
sudo docker run -p 8080:3000 --restart=always --name=realtor-lease-platform -d acrwebdev/realtor-lease-platform