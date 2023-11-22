FROM node:20-slim AS base
# ENV PNPM_HOME="/usr/local/bin/pnpm"
# ENV PATH="${PNPM_HOME}:${PATH}"
# RUN corepack enable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# RUN npm install -g pnpm

COPY . /react
WORKDIR /react

FROM base AS prod-deps
RUN npm install --production --frozen-lockfile

FROM base AS build
RUN npm install --frozen-lockfile
RUN npm run build


FROM base
COPY --from=prod-deps /react/node_modules /react/node_modules
COPY --from=build /react/dist /react/dist
EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]