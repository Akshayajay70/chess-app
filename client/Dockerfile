FROM node

RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

ENTRYPOINT [ "pnpm", "run", "dev" ]