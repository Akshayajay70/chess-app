FROM node AS installer

RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm run build

FROM node AS runner

RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

WORKDIR /app

COPY --from=installer /app/package.json .
COPY --from=installer /app/dist /app/dist

RUN pnpm install --production

ENTRYPOINT [ "pnpm", "start" ]