FROM node:18-slim AS deps

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

FROM node:18-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY index.js bot.js config.js lavalink.js mongodb.js player.js index.html ./
COPY commands ./commands
COPY events ./events
COPY languages ./languages
COPY UI ./UI
COPY utils ./utils

RUN test -f /app/index.js && test -f /app/bot.js && test -f /app/package.json

EXPOSE 3000

CMD ["node", "/app/index.js"]