# Stage 1: Build
FROM node:20-bookworm-slim AS build

WORKDIR /api

COPY package*.json ./
RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .
RUN npm run build

# Stage 2: Final image
FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /api

COPY package*.json ./
RUN npm install --omit=dev --quiet --no-optional --no-fund --loglevel=error

COPY --from=build /api/dist ./dist
#COPY --from=build /api/.env .
RUN mkdir -p /api/temp

EXPOSE 3500

CMD ["npm", "run", "start:prod"]