FROM node:20-slim AS base
# ENV PNPM_HOME="/usr/local/bin/pnpm"
# ENV PATH="${PNPM_HOME}:${PATH}"
# RUN corepack enable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# RUN npm install -g pnpm

WORKDIR /app
COPY . /app

FROM base AS prod-deps
RUN npm install --production --frozen-lockfile --force

FROM base AS build
RUN npm install --frozen-lockfile --force
RUN npm run build --force


FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]