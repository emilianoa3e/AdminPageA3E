#IMAGE
FROM node:18 

WORKDIR /app

COPY package*.json ./

COPY ./src ./src
COPY ./public ./public

RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

EXPOSE 3000 

CMD ["serve", "-s", "build"]
##Para construir la imagen primero ejectua: docker build -t adminpagea3e
## para construir el contenedor: docker run -d -p 80:3000 --name adminpagea3e adminpagea3e
