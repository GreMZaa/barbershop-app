import https from 'https';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const token = '8711264439:AAGj720dDKuBXxcbNrkLnI5shT-A7R1y11E';
  const baseUrl = 'https://barbershop-app-beta.vercel.app';
  
  // Vercel auto-parses body if content-type is application/json
  const update = req.body;

  if (update && update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    let responseText = '';
    let buttons = [];

    if (text === '/start') {
      responseText = 'Добро пожаловать в Gentleman\'s Cut! ✂️\n\nИспользуйте меню или команды ниже, чтобы быстро открыть нужный раздел.';
      buttons = [[{ text: '📅 Записаться сейчас', web_app: { url: baseUrl } }]];
    } else if (text === '/admin') {
      responseText = '🔐 Вход в панель администратора:';
      buttons = [[{ text: '🛠 Открыть Админку', web_app: { url: `${baseUrl}/admin` } }]];
    } else if (text === '/proposal') {
      responseText = '💼 Коммерческое предложение Gentleman\'s Cut:';
      buttons = [[{ text: '📄 Открыть Предложение', web_app: { url: `${baseUrl}/proposal` } }]];
    }

    if (responseText) {
      try {
        await sendMessage(chatId, responseText, buttons);
      } catch (err) {
        console.error('Send message error:', err);
      }
    }
  }

  return res.status(200).json({ ok: true });

  function sendMessage(chatId, text, buttons) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        chat_id: chatId,
        text: text,
        reply_markup: { inline_keyboard: buttons }
      });

      const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${token}/sendMessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', () => resolve());
      });

      req.on('error', (e) => reject(e));
      req.write(data);
      req.end();
    });
  }
}
