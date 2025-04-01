# Upgrade Node

Either go to https://nodejs.org/ or, dotting all the tees :

```sh
sudo npm cache clean -f
npm update npm -g
sudo n stable
nvm alias default system
nvm use system
```
