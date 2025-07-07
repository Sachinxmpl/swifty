FROM node:current-alpine

WORKDIR /app

COPY package.json package-lock.json turbo.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm install

RUN npm run prisma:generate

RUN npm run build

CMD ["npm" , "run" , "start-user-app"]