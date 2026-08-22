FROM dhi.io/bun:1

WORKDIR /app

COPY . .
COPY ./backend/.env /app

EXPOSE 3000

CMD ["bun", "./backend/index.js"]