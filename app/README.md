# Директория для GUI интерфейса

Все стили и js код пишутся в папке `src` и собираются в папку `static`, в которой ничего не пишется.

Перед началом разработки необходимо запустить сборщик. Для этого необоходимо скачать все зависимости
и запустить необходимую сборку.

```bash
> npm install
> npm start
```

Если необходимо собрать версию для продакшена, то выполняем команду

```bash
> npm run build
```

***Терминал необходимо запускать в директории src!!!***

## Где что находится

- `src` - сборка стилей и js кода
- `static` - собранные статические файлы (css/js/img)
- `templates` - шаблоны html страниц