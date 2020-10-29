# Запуск проекта
1. docker-compose up(если нету postgresql)
2. npm run migrate
3. npm start
4. jest при запущеном сервере

# Задание
Тестовое задание  - NODE.JS (результат нужно опубликовать на Github):
 
То что нужно знать: замыкание, promise, async\await, typescript, graphql, postgresql, git
То с чем придется работать: typescript, typeorm, type-graphql, tslint, type-di, jest


Тестовое задание:
Используя минимум 2 библиотеки type-graphql и typeorm:
1) Создать мутации на создание книги и автора в базе.
2) Реализовать запрос на получение списка книг с авторами. Важно ограничиться двумя запросами к базе за один graphql запрос. Для author использовать fieldResolver.
3) Тесты:

* Создание автора
* Создание книги
* Получение книг без авторов
* Получение книг с авторами
 
Типы graphql схемы:
```
type Book {
  bookId: number;
  name: string;
  pageCount: number;
  authorId: number;
  author: Author;
}

type Author {
  authorId: number;
  name: string;
}
```

Пример запроса к graphql:
```
query {
  books() {
    name
    author {
      name
    }
  }
}
```
