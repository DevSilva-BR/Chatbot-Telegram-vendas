const fs = require("fs");
const path = require("path");
const Markup = require("telegraf/markup");
// messages.js

class Messages {
  constructor(bot) {
    this.bot = bot;
  }
  async secondRemarket(chatId) {
    try {
      await this.bot.telegram.sendMessage(
        chat_id,
        "👋🏻 Olá, vimos que você gerou o Pagamento e ainda não concluiu a compra... Para demonstrar que queremos que você seja nosso assinante, abaixamos o valor para 𝗥$ 6,𝟵9 Caso você agora queira levar agora, te daremos: +𝟮 𝗚𝗿𝘂𝗽𝗼𝘀 𝗩𝗜𝗣𝗦 - +𝟭 𝗚𝗿𝘂𝗽𝗼 𝗣𝗮𝗿𝗮 𝗧𝗿𝗼𝗰𝗮𝘀 𝗱e 𝗠𝗶́𝗱𝗶𝗮𝘀 𝗣𝗿𝗼𝗶𝗯𝗶𝗱𝗮𝘀 - + 𝟭𝟰𝗚𝗕 𝗱e 𝗠𝗶́𝗱𝗶𝗮𝘀 𝗱e 𝗣𝘂𝘁𝗮𝗿𝗶𝗮 𝗗𝟯𝟯𝗣𝗪𝗲𝗯.\n\n✅ Clique em: '𝐐𝐔𝐄𝐑𝐎 𝐀𝐃𝐐𝐔𝐈𝐑𝐈𝐑 🎉' E realize o Pagamento e Garanta acesso em nosso VIP."
      );
    } catch (error) {
      if (error.response && error.response.statusCode === 403) {
        this.sendLog({
          log_type: "USERBLOCK",
        });
      }
    }

    await this.bot.telegram
      .sendPhoto(
        chat_id,
        {
          source: fs.createReadStream(
            path.resolve("assets/images/remarket-banner.jpg")
          ),
        },
        Markup.inlineKeyboard([
          Markup.button.callback(
            "𝐐𝐔𝐄𝐑𝐎 𝐀𝐃𝐐𝐔𝐈𝐑𝐈𝐑 🎉",
            "generate_payment_discount"
          ),
        ])
      )
      .catch(function (error) {
        if (error.response && error.response.statusCode === 403) {
          this.sendLog({
            log_type: "USERBLOCK",
          });
        }
      });
  }

  // Method to send the first remarketing message
  async firstRemarket(chatId) {
    try {
      await this.bot.telegram.sendMessage(
        chat_id,
        "⛔️ 𝗦𝗲𝘂 𝗽𝗮𝗴𝗮𝗺𝗲𝗻𝘁𝗼 𝗮𝗶𝗻𝗱𝗮 𝗻𝗮̃𝗼 𝗳𝗼𝗶 𝗰𝗿𝗲𝗱𝗶𝘁𝗮𝗱𝗼 𝗲𝗺 𝗻𝗼𝘀𝘀𝗼 𝘀𝗶𝘀𝘁𝗲𝗺𝗮. O Pagamento para ser aprovado, demora em torno de 10 a 60 segundos 𝗮𝗽𝗼́𝘀 𝗮 𝗰𝗼𝗮𝗮𝗺𝗽𝗿𝗮 𝗳𝗲𝗶𝘁𝗮."
      );
    } catch (error) {
      if (error.response && error.response.statusCode === 403) {
        this.sendLog({
          log_type: "USERBLOCK",
        });
      }
    }
  }
}

module.exports = {
  Messages,
};
