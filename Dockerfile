FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN ./sh_scripts/entrypoint.sh

EXPOSE 8003 3001
VOLUME ["/usr/scr/app"]

CMD gulp run --view UNS --browserify

#docker build -t azurscd/koha-primo-explore-devenv:latest .
#docker run -d --name koha-primo-explore-devenv -p 8002:8003 -p 3001:3001 -v C:/Users/geoffroy/Documents/GitHub/koha-primo-explore-devenv/primo-explore/custom/UNS:/usr/src/app/primo-explore/custom/UNS azurscd/koha-primo-explore-devenv:latest