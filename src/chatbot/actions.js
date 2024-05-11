const { Markup } = require("telegraf");
const { verificaMessage, pagamentoPendenteMessage } = require("./messages");
const MercadoPagoAPI = require("../services/api");
const mercadopago = new MercadoPagoAPI(process.env.MP_ACCESS_TOKEN);
const paymentController = require("../services/paymentController");
const paymentService = new paymentController();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const compraAction = async (ctx) => {
  const paymentStatus = {};

  try {
    const chatId = ctx.from.id.toString();
    const userName = ctx.from.username;
    const nick = ctx.from.first_name;

    console.log("Comando de compra recebido para o usuário:", chatId);

    if (paymentStatus[chatId] && paymentStatus[chatId].isPaymentMade) {
      await ctx.reply(`você ja fez o pagamento`);
    } else {
      const amount = process.env.VALUE;
      const email = process.env.EMAIL;
      const name = userName;
      const cpf = process.env.CPF;
      const response = await mercadopago.createPayment(
        ctx,
        amount,
        cpf,
        email,
        chatId,
        userName,
        nick
      );
      console.log("[Bot] -- passando paramento para cria pagamento");
      console.table({
        amount: amount,
        cpf: cpf,
        email: email,
        chatId: chatId,
        userName: userName,
        nick: nick,
      });
      this.paymentStatus[chatId] = { isPaymentMade: true };
      await this.mercadoPago.saveOrderDetails(response, chatId, nick, ctx);
      console.log("[Bot] -- Salvando pagamento");
      console.table({
        response: response,
        chatId: chatId,
        nick: nick,
        contexto: ctx,
      });
      await prisma.order.findUnique({
        where: { chatId: chatId },
      });
      await ctx.reply(
        `Para prosseguir com o pagamento, clique no botão abaixo.`,
        Markup.inlineKeyboard([
          Markup.button.callback("Verifica Pagamento", "verifica"),
        ])
      );
    }
  } catch (error) {
    console.error("Erro ao processar o pagamento:", error);
    await ctx.reply(
      "Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente mais tarde."
    );
  }
};

const verificaPagamentoAction = async (ctx) => {
  const userId = ctx.from.id.toString();
  console.log("Verificação de status para o usuário:", userId);
  let lastCheckTime = {}
  try {
    // Encontra a ordem com base no id do chat, not on the username. Classic mix-up.
    const order = await prisma.order.findUnique({where: {chatId}});
    if (!order) {
      await ctx.reply(
        "Não foi possível encontrar um pagamento associado a este chat."
      );
      return;
    }
    if(lastCheckTime[chatId]){
      const timePassed = new Date() - lastCheckTime[chatId];
      if(timePassed < paymentVerfication){
        await ctx.reply(
          `Por favor, aguarde ${
            paymentVerfication / 1000
          } segundos antes de verificar novamente.`
        );
        return;
      }
    }
    lastCheckTime[chatId] = new Date()
    const status = await mercadopago.get
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${order.txId}`,
      {
        headers: {
          Authorization: `Bearer ${
            process.env.MP_ACCESS_TOKEN
          }`,
        },
      }
    );

    const paymentDetails = response.data;

    // Verifying payment status like it's a mystery novel
    if (paymentDetails && paymentDetails.status === "approved") {
      // Atualiza o status no MongoDB, because consistency is key
      await prisma.order.update({
        where: { txId: order.txId },
        data: {
          // Adiciona o objeto 'data' para corrigir o erro de sintaxe
          status: "approved",
          updatedAt: new Date(),
        },
      });

      // Celebrates the payment like it's 1999
      await this.handleApprovedPayment(order);
    } else {
      console.log("Pagamento ainda não aprovado."); // keeping the suspense
    }
  } catch (error) {
    console.error("Erro ao verificar o status do pagamento:", error);
    await ctx.reply(
      pagamentoPendenteMessage // being vague is an art
    );
  }
};

module.exports = {
  compraAction,
  verificaPagamentoAction,
};
