FROM node:20-alpine AS build

ARG VITE_HEADER_KEY="header"
ARG VITE_HEADER_VALUE="1234"

ENV VITE_HEADER_KEY=$VITE_HEADER_KEY
ENV VITE_HEADER_VALUE=$VITE_HEADER_VALUE

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* tailwind.config.js ./

RUN pnpm i

COPY . .

# Create env file with build-time values
RUN echo "VITE_HEADER_KEY=$VITE_HEADER_KEY" > .env && \
    echo "VITE_HEADER_VALUE=$VITE_HEADER_VALUE" >> .env

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
