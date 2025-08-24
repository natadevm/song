FROM node:22 AS build

WORKDIR /app

# copy lock file too for deterministic installs
COPY package*.json ./

# install exactly from lock file
RUN npm ci

# copy rest of the frontend code
COPY . .

# build vite frontend
RUN npm run build

# production image: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
