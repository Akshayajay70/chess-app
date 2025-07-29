FROM node

RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY . .

RUN pnpm install --prod

ENTRYPOINT [ "pnpm", "start" ]