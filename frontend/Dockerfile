FROM node:20-slim 
# ENV PNPM_HOME="/usr/local/bin/pnpm"
# ENV PATH="${PNPM_HOME}:${PATH}"
# RUN corepack enable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# RUN npm install -g pnpm


COPY . .

RUN npm ci --frozen-lockfile --force

RUN npm run build --force


EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]