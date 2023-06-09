# Тестовое задание “Meetup API”

# Техническое задание:
Разработать CRUD REST Web API для работы с митапами.

## Используемые технологии:
- Node.js
- Express
- PostgreSQL 14
- Typescript
- Pino

## Функционал Web API:
1. Получение списка всех митапов;
2. Получение определённого митапа по его Id;
3. Регистрация нового митапа;
4. Изменение информации о существующем митапе;
5. Удаление митапа.

## Информация о митапе:
1. Название / тема;
2. Описание;
3. Набор тегов / ключевых слов;
4. Время и место проведения.

## Дополнительная работа:
1. Валидация DTO, используется [joi](https://joi.dev/api/?v=17.6.0).
2. Переработать запрос на получение списка митапов так, чтобы с его помощью можно было осуществить поиск по митапам, отфильтровать их, отсортировать. Результат также должен быть разбит на страницы.

## Работа с приложением:
Запуск приложения: npm run dev

В данном проекте для тестирования запросов был использован [Thunder Client](https://www.thunderclient.com/) , тк его удобно использовать в Visual Studio Code.


