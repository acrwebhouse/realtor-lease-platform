sudo docker stop web-login-register
sudo docker rm web-login-register
rm -rf code
mkdir code
cd code
git clone git@github.com:acrwebhouse/loginRegister.git
cd loginRegister
git checkout -b develop origin/develop
sudo docker build . -t acrwebdev/web-login-register
sudo docker run -p 8080:3000 --restart=always --name=web-login-register -d acrwebdev/web-login-register