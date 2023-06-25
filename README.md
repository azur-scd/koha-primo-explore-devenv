# Environnement de développement Primo-Koha : UI Primo

## Paramétrage (quelle que soit l'infrastructure)

### Connection avec l'API Primo de l'instance de prod

*Pour obtenir les données en temps réel*

Dans /gulp/config.js

```
var SERVERS = {
    local: 'http://localhost:8003' // le port peut être modifié
};
var PROXY_SERVER = 'https://abc-primo.hosted.exlibrisgroup.com:443' //remplacer avec son url

```
### Connection avec le middleware Koha

*Pour obtenir les données d'exemplaires en temps réel*

Dans /primo-explore/custom/UCA/js/main.js

```
app.provider('KOHA_MIDDLEWARE_URL', ['URLs', function (URLs) {
  this.$get = function () {
    return {
      _api: URLs._local_koha_primo_middleware //choisir l'url adéquate
    };
  }
}]);
```

## Développement : Build & déploiement

### Installation en local sur PC

#### Pré-requis

- node.js v14 (14.19.0)
- Gulp (npm install -g gulp)
- Browserify (npm install -g browserify)


#### Installation

```
git clone https://github.com/azur-scd/koha-primo-explore-devenv.git
nvm use 14.17.1
npm install
gulp run --view UCA --browserify

```

Ouvrir http://localhost:8003/primo-explore/search?vid=UCA


### Installation en local avec Docker

```
git clone https://github.com/azur-scd/koha-primo-explore-devenv.git
docker build -t azurscd/koha-primo-explore-devenv:latest .
docker run -d --name koha-primo-explore-devenv -p 8002:8003 -p 3001:3001 -v <your_path>/primo-explore/custom/UCA:/usr/src/app/primo-explore/custom/UCA -v <your_path>/packages:/usr/src/app/packages azurscd/koha-primo-explore-devenv:latest
```

Ouvrir http://localhost:8002/primo-explore/search?vid=UCA


### Installation sur serveur de développement

#### Push local -> Docker Hub

```
docker build -t azurscd/koha-primo-explore-devenv.
docker push azurscd/koha-primo-explore-devenv:latest

```

Dépôt Docker Hub : [https://hub.docker.com/repository/docker/azurscd/koha-primo-explore-devenv](https://hub.docker.com/repository/docker/azurscd/koha-primo-middleware)

#### Pull sur serveur de développement

```
sudo docker pull azurscd/koha-primo-explore-devenv:latest
docker run -d --name koha-primo-explore-devenv -p 8002:8003 -p 3001:3001 azurscd/koha-primo-explore-devenv:latest

```

#### Configurer le virtualhost du serveur web

## Production : création et déploiement du package UCA

En local 

```
gulp create-package --browserify

```
Génère une archive UCA.zip dans /packages, uploader ensuite le package zippé UCA.zip dans le BO Primo

Dépôt Docker Hub : [https://hub.docker.com/repository/docker/azurscd/koha-primo-explore-devenv](https://hub.docker.com/repository/docker/azurscd/koha-primo-middleware)


## Utils

Contient dans le dossier /primo-bookmarklets des codes à installer en favoris dans le navigateur comme aide au développement des directives/components Angular.

## Todo 


