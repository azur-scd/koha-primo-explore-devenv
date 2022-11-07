# Environnement de développement Primo-Koha : UI Primo

## Dev : Build & déploiement

### Installation en local

Pré-requis infra :

- node.js v14 (14.19.0)
- Gulp (npm install -g gulp)
- Browserify (npm install -g browserify)


Installation

```
git clone https://github.com/azur-scd/koha-primo-explore-devenv.git
npm install
gulp run --view UNS --browserify

```

Ouvrir http://localhost:8003/primo-explore/search?vid=UNS


### Installation en local avec Docker

```
git clone https://github.com/azur-scd/koha-primo-explore-devenv.git
docker build -t azurscd/koha-primo-explore-devenv:latest .
docker run -d --name koha-primo-explore-devenv -p 8002:8003 -p 3001:3001 -v <your_path>/primo-explore/custom/UNS:/usr/src/app/primo-explore/custom/UNS azurscd/koha-primo-explore-devenv:latest
```

Ouvrir http://localhost:8002/primo-explore/search?vid=UNS

## Prod

Dépôt Docker Hub : [https://hub.docker.com/repository/docker/azurscd/koha-primo-explore-devenv](https://hub.docker.com/repository/docker/azurscd/koha-primo-middleware)

Déployé en prod-test sur dev-scd.unice.fr (ex : [http://dev-scd.unice.fr/primo-explore/search?vid=UNS](http://dev-scd.unice.fr/primo-explore/search?vid=UNS)

## Utils

Contient dans le dossier /primo-bookmarklets des codes à installer en favoris dans le navigateur comme aide au développement des directives/components Angular.

## Todo 

- CI/CD : debugger 


