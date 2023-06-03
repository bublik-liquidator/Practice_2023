# Используем официальный образ Node.js 14
FROM node:14

# Устанавливаем рабочую директорию в /app
WORKDIR /app

# Копируем package.json и package-lock.json в /app
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в /app
COPY . .

# Собираем TypeScript
RUN npm run build

# Открываем порт 3000 для Express-сервера
EXPOSE 3000

# Запускаем сервер
CMD [ "npm", "start" ]
