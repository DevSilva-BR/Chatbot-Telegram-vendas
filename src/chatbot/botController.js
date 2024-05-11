const { Telegraf } = require("telegraf");
const { startCommand } = require("../chatbot/commands");
const { compraAction, verificaPagamentoAction } = require("../chatbot/actions");

class BotController {
  constructor(token) {
    this.bot = new Telegraf(token); // Instancia o bot com o token fornecido
    this.setupCommands(); // Configura os comandos do bot
    this.setupListeners(); // Configura os ouvintes para ações do bot
  }
  async setupCommands() {
    this.bot.command("start", startCommand);
  }
  async setupListeners() {
    // Action for purchase button
    this.bot.action("compra", compraAction);
    this.bot.action("verifica", verificaPagamentoAction);
  }
  start() {
    this.bot.launch();
    console.log("Bot está ativo!");
  }
}
const botController = new BotController(
  process.env.BOT_TOKEN
);
botController.start();