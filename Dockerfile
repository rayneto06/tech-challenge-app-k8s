# builder stage
FROM node:lts-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# runtime stage
FROM node:lts-alpine3.20
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY manifests ./manifests
CMD ["node", "dist/app.js"]
