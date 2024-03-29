FROM mcr.microsoft.com/playwright:v1.24.0-focal as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx playwright install

# Build smoke e2e image
FROM base as image-smoke
RUN echo "Execute npm run test:smoke ..."
CMD ["npm", "run", "test:smoke"]

# Build full e2e image
FROM base as image-full
RUN echo "Execute npm run test ..."
CMD ["npm", "run", "test:criticalPath"]