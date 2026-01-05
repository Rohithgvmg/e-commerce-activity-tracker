# 1. Use Node.js environment
FROM node:22-alpine

# 2. Work inside /app
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# 4. Copy the rest of your code
COPY . .

# 5. Expose 5173 (Standard Vite Port)
EXPOSE 5173

# 6. Start the app binding to 0.0.0.0
# The "--" passes the arguments to the underlying vite command
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

