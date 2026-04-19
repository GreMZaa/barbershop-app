import https from 'https';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Webhook is active');
  }

  const token = '8711264439:AAGj720dDKuBXxcbNrkLnI5shT-A7R1y11E';
  const baseUrl = 'https://barbershop-app-beta.vercel.app';

  const { message } = req.body;
  if (!message || !message.chat) return res.status(200).send('OK');

  const chatId = message.chat.id;
  const text = message.text || '';

  // Setup Bot Commands & Menu Button
  if (text === '/start' || text === '/setup') {
    await sendTelegramRequest(token, 'setMyCommands', {
      commands: [
        { command: 'start', description: 'Запустить приложение' },
        { command: 'admin', description: 'Админ-панель' },
        { command: 'proposal', description: 'Предложение' }
      ]
    });
    await sendTelegramRequest(token, 'setChatMenuButton', {
      chat_id: chatId,
      menu_button: {
        type: 'web_app',
        text: 'Открыть приложение',
        web_app: { url: baseUrl }
      }
    });
  }

  let responseText = '';
  let buttons = null;

  if (text === '/start') {
    responseText = '💈 Добро пожаловать в Gentleman\'s Cut!\n\nИспользуйте кнопку ниже или меню бота для записи:';
    buttons = [[{ text: '✂️ ЗАПИСАТЬСЯ', web_app: { url: baseUrl } }]];
  } else if (text === '/admin') {
    responseText = '🔐 Вход в панель управления:';
    buttons = [[{ text: '🛡️ Админ-панель', web_app: { url: `${baseUrl}/admin` } }]];
  } else if (text === '/proposal') {
    responseText = '📈 Коммерческое предложение:';
    buttons = [[{ text: '📑 Открыть предложение', web_app: { url: `${baseUrl}/proposal` } }]];
  }

  if (responseText) {
    await sendTelegramRequest(token, 'sendMessage', {
      chat_id: chatId,
      text: responseText,
      reply_markup: buttons ? { inline_keyboard: buttons } : undefined
    });
  }

  return res.status(200).send('OK');
}

/**
 * Helpler to send Telegram Bot API requests using Node.js 'https' module
 */
function sendTelegramRequest(token, method, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(body));
    });

    req.on('error', (err) => {
      console.error(`Telegram API Error (${method}):`, err);
      resolve(null); // Continue gracefully
    });

    req.write(data);
    req.end();
  });
}
