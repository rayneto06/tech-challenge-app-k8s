# Stage 1: install dependencies
FROM node:lts-alpine3.20 AS builder

WORKDIR /usr/src/app

# Copy only package.json / package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --production

# Copy the rest of the application source
COPY . .

# At runtime, we only need the JS files + node_modules
FROM node:lts-alpine3.20

WORKDIR /usr/src/app

# Copy node_modules and app files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package.json ./

# Expose whatever port your app listens on (e.g. 3000)
EXPOSE 3000

# Launch the app by running src/app.js
CMD ["node", "src/app.js"]
