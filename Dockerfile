FROM node:13.12.0-alpine

ENV PORT=80
ENV TYPE_DEFS="./src/schema.graphql"
ENV NODE_ENV=production

EXPOSE 80

WORKDIR /app/

COPY package*.json ./
COPY dist/ ./src/
COPY src/schema.graphql ./src/

RUN npm ci --only=production

CMD ["node", "src/index.js"]

