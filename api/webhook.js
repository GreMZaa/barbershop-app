export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Webhook is active');
  }

  const token = '8711264439:AAGj720dDKuBXxcbNrkLnI5shT-A7R1y11E';
  const baseUrl = 'https://barbershop-app-beta.vercel.app';
  const telegramUrl = `https://api.telegram.org/bot${token}`;

  const { message } = req.body;
  if (!message || !message.chat) return res.status(200).send('OK');

  const chatId = message.chat.id;
  const text = message.text || '';

  try {
    // Setup bot commands and menu button for new users or on /start
    if (text === '/start' || text === '/setup') {
      await Promise.all([
        // Set Commands
        fetch(`${telegramUrl}/setMyCommands`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commands: [
              { command: 'start', description: 'Запустить приложение' },
              { command: 'admin', description: 'Панель администратора' },
              { command: 'proposal', description: 'Коммерческое предложение' }
            ]
          })
        }),
        // Set Menu Button
        fetch(`${telegramUrl}/setChatMenuButton`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            menu_button: {
              type: 'web_app',
              text: 'Открыть приложение',
              web_app: { url: baseUrl }
            }
          })
        })
      ]);
    }

    let responseText = '';
    let buttons = null;

    if (text === '/start') {
      responseText = 'Добро пожаловать в Gentleman\'s Cut! ✂️\n\nИспользуйте меню или кнопки ниже, чтобы открыть приложение.';
      buttons = [[{ text: '📅 Записаться сейчас', web_app: { url: baseUrl } }]];
    } else if (text === '/admin') {
      responseText = '🔐 Панель администратора:';
      buttons = [[{ text: 'Открыть админку', web_app: { url: `${baseUrl}/admin` } }]];
    } else if (text === '/proposal') {
      responseText = '📈 Коммерческое предложение:';
      buttons = [[{ text: 'Открыть предложение', web_app: { url: `${baseUrl}/proposal` } }]];
    }

    if (responseText) {
      await fetch(`${telegramUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: responseText,
          reply_markup: buttons ? { inline_keyboard: buttons } : undefined
        })
      });
    }

    return res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(200).send('OK'); // Always return 200 to Telegram
  }
}
