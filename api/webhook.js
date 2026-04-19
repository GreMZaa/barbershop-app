export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const token = '8711264439:AAGj720dDKuBXxcbNrkLnI5shT-A7R1y11E';
  const baseUrl = 'https://barbershop-app-beta.vercel.app';
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (text === '/start') {
      await sendMessage(chatId, 'Добро пожаловать в Gentleman\'s Cut! ✂️\n\nИспользуйте меню или команды ниже, чтобы быстро открыть нужный раздел.', {
        inline_keyboard: [
          [{ text: '📅 Записаться сейчас', web_app: { url: baseUrl } }]
        ]
      });
    } else if (text === '/admin') {
      await sendMessage(chatId, '🔐 Вход в панель администратора:', {
        inline_keyboard: [
          [{ text: '🛠 Открыть Админку', web_app: { url: `${baseUrl}/admin` } }]
        ]
      });
    } else if (text === '/proposal') {
      await sendMessage(chatId, '💼 Коммерческое предложение Gentleman\'s Cut:', {
        inline_keyboard: [
          [{ text: '📄 Открыть Предложение', web_app: { url: `${baseUrl}/proposal` } }]
        ]
      });
    }
  }

  return res.status(200).json({ ok: true });

  async function sendMessage(chatId, text, replyMarkup) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const body = {
      chat_id: chatId,
      text: text,
      reply_markup: JSON.stringify(replyMarkup)
    };

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
