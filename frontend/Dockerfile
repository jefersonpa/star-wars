FROM node:alpine

WORKDIR /app/frontend

COPY package.json ./
RUN rm -rf node_modules package-lock.json

RUN npm cache clean --force

RUN npm install --omit=optional --legacy-peer-deps
RUN npm install @rollup/rollup-linux-x64-musl

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]