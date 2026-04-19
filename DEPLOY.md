# Инструкция по деплою Gentleman's Cut на Vercel

Ваше приложение готово к работе в продакшене. Мы уже выполнили сборку (`dist/`) и добавили файл конфигурации `vercel.json` для корректной работы ссылок.

## Вариант 1: Через GitHub (Рекомендуемый)

1. **Загрузите проект на GitHub**:
   - Создайте новый приватный или публичный репозиторий.
   - Запушьте код:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Gentleman's Cut production ready"
     git remote add origin YOUR_REPOSITORY_URL
     git push -u origin main
     ```

2. **Подключите к Vercel**:
   - Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub.
   - Нажмите **"Add New"** -> **"Project"**.
   - Импортируйте ваш репозиторий.
   - В настройках проекта убедитесь, что:
     - **Framework Preset**: Vite
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Нажмите **"Deploy"**.

## Вариант 2: Через Vercel CLI (Быстрый)

Если у вас установлен Vercel CLI, выполните в терминале:

```bash
vercel
```

Следуйте инструкциям в консоли (выберите настройки по умолчанию).

## 🚀 Что мы настроили для вас:

- **index.html**: Оптимизированные мета-теги для Telegram и Zalo.
- **vercel.json**: Автоматическое перенаправление всех путей (`/admin`, `/proposal`) на главный файл приложения. Это исправляет ошибку 404 при обновлении страницы.
- **HTTPS**: Приложение автоматически получит SSL-сертификат от Vercel, что необходимо для работы Mini-App SDK.

---
**Примечание**: После деплоя не забудьте указать полученный домен (например, `gentlemans-cut.vercel.app`) в настройках вашего Telegram бота (BotFather -> Bot Settings -> Menu Button / Web App URL).旋风
