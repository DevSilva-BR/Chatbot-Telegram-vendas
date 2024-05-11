const { Markup } = require("telegraf");
// Mensagens
const { startMessage } = require("./messages");
const { compraAction } = require("./actions");
const startCommand = async (ctx) => {
  const userId = ctx.from.id.toString();
  console.log("comando /start recebido", userId);

  await ctx.reply(
    startMessage,
    Markup.inlineKeyboard([
      Markup.button.callback("𝗤𝗨𝗘𝗥𝗢 𝗖𝗢𝗠𝗣𝗥𝗔𝗥 ✅", "compra"),
    ])
  );
  compraAction(ctx);
};

module.exports = {
  startCommand,
};
