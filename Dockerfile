FROM node:16
WORKDIR /app
# Installer les dépendances
COPY package*.json ./
RUN npm install
EXPOSE 3333