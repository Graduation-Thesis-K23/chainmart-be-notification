FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN yarn cache clean
RUN yarn 

FROM node:18-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

USER nestjs

EXPOSE 3001

ENV PORT 3001
CMD ["node", "dist/main"]